import google.generativeai as genai
import os
import json

# Load API key (adjust based on your environment)
genai.configure(api_key=os.getenv("API_KEY"))
model = genai.GenerativeModel("gemini-1.5-pro")  # or use your preferred variant

def evaluate_match(user_values, politician_name, article_text):
    prompt = f"""
Compare the following values with this politician's inferred values.

User's predicted values:
- {', '.join(user_values)}

Politician: {politician_name}

Article Content:
\"\"\"
{article_text}
\"\"\"

Task:
- Determine how many of the user's values are reflected in the politician’s statements or actions.
- If at least 2 match, return "MATCH" and explain briefly.
- If fewer than 2 match, return "NO MATCH".
Response format:
[MATCH or NO MATCH]
Reason: ...
"""

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"ERROR: {str(e)}"

def get_matching_politicians(user_values):
    with open("data/politicians_matches.json", "r", encoding="utf-8") as f:
        all_articles = json.load(f)

    results = []
    for name, article in all_articles.items():
        analysis = evaluate_match(user_values, name, article)

        if analysis.startswith("MATCH"):
            results.append({"name": name, "reason": analysis})

    return results
