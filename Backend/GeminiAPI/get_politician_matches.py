import os
import json
import pandas as pd
import google.generativeai as genai
from dotenv import load_dotenv
from datetime import datetime
from mongodb import db
import re

from GeminiAPI.candidate_utils import clean_backend_text


# === CONFIG ===
load_dotenv()
genai.configure(api_key=os.getenv("API_KEY"))
model = genai.GenerativeModel("gemini-1.5-pro")

# === SAFE PATHS ===
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ARTICLES_PATH = os.path.join(BASE_DIR, "data", "politicians_matches.json")
CANDIDATES_CSV_PATH = os.path.join(BASE_DIR, "data", "candidates.csv")

# === FUNCTIONS ===

def get_user_values(chat_id):
    """Fetch predicted user values from MongoDB"""
    document = db["predicted_user_values"].find_one({"chatId": chat_id})
    if document and "predicted_values" in document:
        values = document["predicted_values"].get("values", [])
        user_values = [
            item["name"].strip().replace(",", "")
            for item in values
            if item.get("score", 0) >= 4
        ]
        return user_values
    return []

def evaluate_match(user_values, politician_name, article_text, language="english"):
    """Ask Gemini if user's values match politician's article content"""
    if language.lower() == "tagalog":
        prompt = f"""
Ihambing ang mga sumusunod na pinahahalagahan ng user sa nilalaman ng artikulo ng pulitikong ito.

Pinahahalagahan ng user:
- {', '.join(user_values)}

Politiko: {politician_name}
Artikulo:
\"\"\"{article_text}\"\"\"

Gawin mo ito:
- Kung mayroong hindi bababa sa 2 na magkatugmang pinahahalagahan, ibalik ang "MATCH" at isang maikling paliwanag.
- Kung hindi, ibalik ang "NO MATCH".

Format ng sagot:
[MATCH o NO MATCH]
Reason: ...
"""
    else:
        prompt = f"""
Compare the following values with this politician's values.

User's values:
- {', '.join(user_values)}

Politician: {politician_name}
Article:
\"\"\"{article_text}\"\"\"

Task:
- If at least 2 values match, return "MATCH" and a short reason.
- Else return "NO MATCH".

Response format:
[MATCH or NO MATCH]
Reason: ...
"""
    response = model.generate_content(prompt)
    return response.text.strip()

def compare_with_profile(user_values, candidate_data, language="english"):
    """Ask Gemini to give match score between user values and candidate profile"""
    if language.lower() == "tagalog":
        prompt = f"""
Ihambing mo bilang isang AI analyst ang mga pinahahalagahan ng user sa profile ng pulitiko.

Pinahahalagahan ng user:
- {', '.join(user_values)}

Profile ng Pulitiko:
- Paninindigan: {candidate_data.get('stance', '')}
- Adbokasiya/Plataporma: {candidate_data.get('advocacy_or_platform', '')}
- Mga Nagawa: {candidate_data.get('achievements', '')}
- Mga Panukalang Batas: {candidate_data.get('bills_filed', '')}
- Background: {candidate_data.get('background', '')}

Gawin:
- Magbigay ng match_score mula 1 (mababa) hanggang 5 (mataas).
- Magbigay ng 1 pangungusap na paliwanag.

Ibalik bilang JSON lamang:
{{
    "match_score": X,
    "explanation": "..."
}}
"""
    else:
        prompt = f"""
You are comparing a user's values with a politician's profile.

User's values:
- {', '.join(user_values)}

Politician profile:
- Stance: {candidate_data.get('stance', '')}
- Advocacy/Platform: {candidate_data.get('advocacy_or_platform', '')}
- Achievements: {candidate_data.get('achievements', '')}
- Bills Filed: {candidate_data.get('bills_filed', '')}
- Background: {candidate_data.get('background', '')}

Task:
- Give a match_score from 1 (low) to 5 (high).
- Add 1 sentence explanation why.

Return only JSON:
{{
    "match_score": X,
    "explanation": "..."
}}
"""
    response = model.generate_content(prompt).text.strip()
    response = re.sub(r"^```(?:json)?|```$", "", response, flags=re.IGNORECASE).strip()
    try:
        result = json.loads(response)
    except Exception:
        result = {"match_score": 0, "explanation": "Gemini response invalid"}
    return result

def get_matching_politicians(chat_id, language="english"):
    """Main function: find politicians matching user values"""
    user_values = get_user_values(chat_id)
    if not user_values:
        print(f"⚠️ No user values for chatId {chat_id}")
        return []

    if not os.path.exists(ARTICLES_PATH):
        print(f"❌ File not found: {ARTICLES_PATH}")
        return []

    with open(ARTICLES_PATH, "r", encoding="utf-8") as f:
        all_articles = json.load(f)

    if not os.path.exists(CANDIDATES_CSV_PATH):
        print(f"❌ File not found: {CANDIDATES_CSV_PATH}")
        return []

    candidates_df = pd.read_csv(CANDIDATES_CSV_PATH)
    matches = []

    for name, article in all_articles.items():
        analysis = evaluate_match(user_values, name, article, language=language)
        if analysis.startswith("MATCH"):
            candidate_row = candidates_df[candidates_df["name"].str.contains(name, case=False, na=False)]
            candidate_data = candidate_row.iloc[0].to_dict() if not candidate_row.empty else {}

            profile_comparison = compare_with_profile(user_values, candidate_data, language=language)

            matches.append({
                "name": clean_backend_text(name),
                "reason": clean_backend_text(analysis.replace("MATCH", "").replace("Reason:", "").strip()),
                "profile_match_score": profile_comparison.get("match_score", 0),
                "profile_explanation": clean_backend_text(profile_comparison.get("explanation", "")),
                "candidate_info": {k: clean_backend_text(v) for k, v in candidate_data.items()}
            })

    ranked_matches = sorted(matches, key=lambda x: x["profile_match_score"], reverse=True)[:12]

    try:
        db["matching_candidates"].insert_one({
            "chatId": chat_id,
            "timestamp": datetime.utcnow(),
            "results": ranked_matches
        })
        print(f"✅ Saved {len(ranked_matches)} matches to MongoDB for chatId {chat_id}")
    except Exception as e:
        print(f"❌ MongoDB save error: {e}")

    return ranked_matches

# === TEST ===
if __name__ == "__main__":
    test_chat_id = "your_test_chatId_here"
    results = get_matching_politicians(test_chat_id)
    for r in results:
        print(f"{r['name']} (Score: {r['profile_match_score']}) → {r['reason']}")
