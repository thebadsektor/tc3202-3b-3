import os
import pandas as pd
import re
import unicodedata
from difflib import get_close_matches

def normalize_name(text):
    if pd.isna(text):
        return ""
    text = unicodedata.normalize("NFKD", str(text)).lower()
    text = text.replace("’", "'").replace("‘", "'")
    text = text.replace("sen.", "").replace("rep.", "").replace("mr.", "").replace("ms.", "")
    text = text.replace("jr.", "").replace("jr", "").replace("sr.", "").replace("sr", "")
    text = text.replace(".", "").replace(",", "")
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def clean_backend_text(text):
    if pd.isna(text):
        return ""
    if isinstance(text, bytes):
        text = text.decode('latin1')
    return unicodedata.normalize("NFC", str(text))

def get_score_description(score):
    if score >= 90:
        return "Exceptional alignment with user values"
    elif score >= 80:
        return "Very strong alignment"
    elif score >= 70:
        return "Strong alignment"
    elif score >= 60:
        return "Moderate alignment"
    else:
        return "Weak or no meaningful alignment"

def parse_gemini_output(text):
    parsed = []
    lines = text.strip().splitlines()
    current_name = None
    current_score = 0
    current_reason = ""

    for line in lines:
        line = line.strip()
        if line.startswith("Full Name:"):
            if current_name:
                parsed.append((current_name, current_score, current_reason.strip()))
            current_name = line.replace("Full Name:", "").strip()
            current_score = 0
            current_reason = ""
        elif line.startswith("Score:"):
            try:
                current_score = int(line.replace("Score:", "").strip())
            except:
                current_score = 0
        elif line.startswith("Reason:"):
            current_reason = line.replace("Reason:", "").strip()
        elif current_reason != "":
            current_reason += " " + line

    if current_name:
        parsed.append((current_name, current_score, current_reason.strip()))

    return parsed

def load_candidate_data():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(base_dir, "..", "data")
    csv_path = os.path.join(data_dir, "candidates.csv")
    try:
        return pd.read_csv(csv_path, encoding="utf-8-sig")
    except Exception as e:
        print(f"❌ Failed to load candidates.csv: {e}")
        return pd.DataFrame()

def enrich_with_candidate_data(gemini_result_text):
    parsed = parse_gemini_output(gemini_result_text)
    candidate_df = load_candidate_data()

    candidate_df["nickname_clean"] = candidate_df["nickname"].astype(str).apply(normalize_name)
    candidate_df["full_name_clean"] = candidate_df["full_name"].astype(str).apply(normalize_name)

    enriched = []

    print(f"\n📋 Total candidates loaded: {len(candidate_df)}")
    print(f"📝 Gemini output parsed: {parsed}")

    for name, score, reason in parsed:
        clean_name = normalize_name(name)
        print(f"\n🔍 Trying to match: '{name}' → '{clean_name}'")

        match = candidate_df[
            (candidate_df["nickname_clean"] == clean_name) |
            (candidate_df["full_name_clean"] == clean_name)
        ]

        if match.empty:
            possible_matches = candidate_df["full_name_clean"].tolist()
            closest = get_close_matches(clean_name, possible_matches, n=1, cutoff=0.6)
            if closest:
                print(f"🔎 Fuzzy match found: '{name}' → '{closest[0]}'")
                match = candidate_df[candidate_df["full_name_clean"] == closest[0]]

        if not match.empty:
            print(f"✅ Match found for: {name}")
            row = match.iloc[0]
            enriched.append({
                "name": clean_backend_text(row["nickname"]),
                "party": clean_backend_text(row["party"]),
                "imageUrl": clean_backend_text(row["link_image"]),
                "reason": clean_backend_text(reason.strip()),
                "score": score,
                "score_explanation": get_score_description(score)
            })
        else:
            print(f"❌ No match for: '{name}' → '{clean_name}'")

    enriched.sort(key=lambda x: x["score"], reverse=True)
    return enriched
