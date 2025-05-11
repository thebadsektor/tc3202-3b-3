import os
import pandas as pd
import google.generativeai as genai
from mongodb.db import db
from mongodb.politician_recommendation import save_recommendations_to_mongo
from random import sample
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-1.5-flash')

base_dir = os.path.dirname(os.path.abspath(__file__))
data_dir = os.path.join(base_dir, "..", "data")

articles_csv_path = os.path.join(data_dir, "politician_articles.csv")
try:
    articles_df = pd.read_csv(articles_csv_path)
except Exception as e:
    articles_df = pd.DataFrame()
    print(f"❌ Error loading articles: {e}")

candidates_csv_path = os.path.join(data_dir, "candidates.csv")
try:
    candidates_df = candidates_df = pd.read_csv(candidates_csv_path, encoding='utf-8-sig')

except Exception as e:
    candidates_df = pd.DataFrame()
    print(f"❌ Error loading candidates.csv: {e}")

if not candidates_df.empty:
    candidates_values = candidates_df.set_index('full_name').apply(
        lambda row: " ".join([
            str(row.get('advocacy_or_platform', '')),
            str(row.get('bills_filed', '')),
            str(row.get('stance', '')),
            str(row.get('background', ''))
        ]), axis=1
    ).to_dict()
else:
    candidates_values = {}

def generate_user_politician_comparison(user_values, language="english"):
    try:
        if not user_values:
            return "Error: No user values provided."

        print("\n🔍 Predicted User Values:")
        for val in user_values:
            print(f" - {val}")

        if not articles_df.empty:
            grouped = articles_df.groupby('candidate_name')['article_text'].apply(lambda x: " ".join(x.dropna()))
            sampled_texts = sample(grouped.tolist(), k=min(5, len(grouped)))
            text_to_use = " ".join(sampled_texts)[:4000]
        else:
            text_to_use = ""

        print("\n📄 Sampled Article Content (First 500 chars):")
        print(text_to_use[:500] + "...")

        combined_candidate_values = "\n\n".join([
            f"{name}:\n{values}" for name, values in candidates_values.items()
        ])

        if language.lower() == "tagalog":
            prompt = f"""
Ikaw ay isang AI political analyst. Ang iyong tungkulin ay suriin at ihambing ang mga pinahahalagahan ng user sa mga pinahahalagahan ng mga pulitikong Pilipino.

Mga pinahahalagahan ng user:
{user_values}

Mayroon kang dalawang sources ng data:
1. Mga artikulo (pananaw, paniniwala, aksyon) mula sa media.
2. Opisyal na impormasyon ng kandidato: adbokasiya, plataporma, mga panukalang batas, mga opinyon, at background.

Narito ang opisyal na datos ng mga kandidato:
\"\"\"
{combined_candidate_values}
\"\"\"

Narito ang mga nilalaman ng mga artikulo:
\"\"\"
{text_to_use}
\"\"\"

Gawin mo ito:
1. Tukuyin ang mga pulitiko na may pinakamatibay na pagkakatugma sa pinahahalagahan ng user.
2. Magbigay ng score mula 0 hanggang 100 kung gaano kalapit ang kanilang mga paniniwala.
3. Ayusin mula highest score pababa.
4. Ipaliwanag kung bakit sila tumugma.
5. Huwag isama kung score ay mababa sa 60.

Format ng sagot:

Full Name: [Exact full_name]
Score: [number]
Reason: [reason text]
"""
        else:
            prompt = f"""
You are a political analyst AI. Your task is to analyze and compare the user's predicted values with the values of various Filipino politicians.

The user's predicted values are:
{user_values}

You have two data sources:
1. Article insights (values, beliefs, actions) from news/media.
2. Official candidate information: advocacy, platform, bills filed, stances, and background.

Here are the official candidate data:
\"\"\"
{combined_candidate_values}
\"\"\"

Here is the article content:
\"\"\"
{text_to_use}
\"\"\"

Your job:
1. Identify the politicians whose values **closely align** with the user's.
2. For each aligned politician, assign a **score from 0 to 100** representing how closely their values match the user's.
3. Rank politicians from highest to lowest score.
4. For each politician, explain why their values match.
5. Exclude any politician who scores below 60.
6. Format exactly like this:

Full Name: [Exact full_name]
Score: [number]
Reason: [reason text]
"""

        response = model.generate_content(prompt)
        print("\n🤖 Gemini Response:")
        print(response.text.strip())

        save_recommendations_to_mongo(response.text)

        return response.text.strip()

    except Exception as e:
        return f"❌ Error generating Gemini content: {str(e)}"
