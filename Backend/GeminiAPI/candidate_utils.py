import os
import pandas as pd
import re
import unicodedata
import difflib


# Load candidate CSV once
base_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.abspath(os.path.join(base_dir, "..", "candidates.csv"))
candidate_df = pd.read_csv(csv_path)

def normalize_name(text):
    if pd.isna(text):
        return ""
    text = unicodedata.normalize("NFKD", str(text))  # Handle accents and curly quotes
    text = text.replace("’", "'").replace("‘", "'")  # Normalize apostrophes
    return text.strip().lower()

# Load candidate details
def load_candidate_data():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.abspath(os.path.join(base_dir, "..", "candidates.csv"))
    try:
        return pd.read_csv(csv_path, encoding="ISO-8859-1")
    except Exception as e:
        print(f"❌ Failed to load candidates.csv: {e}")
        return pd.DataFrame()

# Extract names + reasons from Gemini output
def parse_gemini_output(text):
    pattern = r"\d+\.\s+([^\n]+?)\s*\nReason:\s+(.*?)(?=\n\d+\.|\Z)"
    return re.findall(pattern, text, re.DOTALL)

# Match Gemini names to CSV nicknames and build enriched card data
# def enrich_with_candidate_data(gemini_result_text):
#     parsed = parse_gemini_output(gemini_result_text)
#     candidate_df = load_candidate_data()

#     # Normalize both nickname and full_name
#     candidate_df["nickname_clean"] = candidate_df["nickname"].apply(normalize_name)
#     candidate_df["full_name_clean"] = candidate_df["full_name"].apply(normalize_name)

#     enriched = []

#     for name, reason in parsed:
#         clean_name = normalize_name(name)

#         match = candidate_df[
#             (candidate_df["nickname_clean"] == clean_name) |
#             (candidate_df["full_name_clean"] == clean_name)
#         ]

#         if not match.empty:
#             row = match.iloc[0]
#             enriched.append({
#                 "name": row["nickname"],
#                 "party": row["party"],
#                 "imageUrl": row["link_image"],
#                 "reason": reason.strip()
#             })
#         else:
#             print(f"⚠️ No match for: {name}")

#     return enriched



def find_best_match(name, nickname_list):
    """Return the best fuzzy match from the nickname list"""
    matches = difflib.get_close_matches(name, nickname_list, n=1, cutoff=0.6)
    return matches[0] if matches else None


def enrich_with_candidate_data(raw_text):
    enriched = []
    lines = raw_text.strip().split("\n")

    current_candidate = {}
    for line in lines:
        if line.strip() == "":
            continue

        if line.strip()[0].isdigit() and "." in line:
            # Save previous candidate if matched
            if current_candidate:
                enriched.append(current_candidate)
                current_candidate = {}

            candidate_name = line.split(".", 1)[1].strip()
            print("🧪 Gemini name:", candidate_name)

            nickname_list = candidate_df['nickname'].astype(str).tolist()
            best_match_name = find_best_match(candidate_name, nickname_list)
            print("🔍 Best fuzzy match:", best_match_name)

            if best_match_name:
                match = candidate_df[candidate_df['nickname'] == best_match_name].iloc[0]
                current_candidate = {
                    "name": best_match_name,
                    "party": match["party"],
                    "imageUrl": match["link_image"]
                }
            else:
                # Not in your candidate list — skip
                current_candidate = {}

        elif "Reason:" in line and current_candidate:
            current_candidate["reason"] = line.split("Reason:", 1)[1].strip()

    if current_candidate:
        enriched.append(current_candidate)

    print("📦 Final Enriched Candidates:", enriched)
    return enriched

