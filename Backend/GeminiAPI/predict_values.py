import google.generativeai as genai
import os
import json
import re
from dotenv import load_dotenv
from datetime import datetime
from mongodb import db

# Load environment variables
load_dotenv()
api_key = os.getenv("API_KEY")

# Configure Gemini
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

def predict_values_based_on_answers(answers, politician_answers, age, gender, chat_id="anonymous", language="english"):
    try:
        print(f"🧠 Saving prediction for chatId: {chat_id} with language: {language}")

        existing = db["predicted_user_values"].find_one({"chatId": chat_id})
        if existing:
            print("⚠️ Reusing existing prediction from MongoDB")
            return existing["predicted_values"]

        formatted_answers = "\n".join([f"Answer {i+1}: {a}" for i, a in enumerate(answers)])
        formatted_politicians = "\n".join([f"Politician Answer {i+1}: {a}" for i, a in enumerate(politician_answers)])

        generation_config = {"temperature": 0.4}  # ✅ lower randomness

        if language.lower() == "tagalog":
            prompt = f"""Batay sa mga sumusunod na impormasyon, tukuyin at i-score ang mga pangunahing pinahahalagahan o paniniwala ng tao.

Edad: {age}
Kasarian: {gender}

Mga sagot sa personal test:
{formatted_answers}

Mga piniling pananaw ng politiko:
{formatted_politicians}

Mga tagubilin:
- Pumili ng anumang mga values na makabuluhan (hindi limitado sa listahan).
- Para sa bawat value:
  - Magbigay ng score mula 1 hanggang 5.
  - Magbigay ng simpleng paliwanag kung bakit ito tumutugma.
  - Huwag banggitin o i-reference ang number ng sagot o politician answer.
- Gumamit ng simpleng Tagalog na madaling maintindihan.

Magbigay rin ng **overall_summary** para ilarawan ang estilo ng pananaw ng user sa 1-3 maikling pangungusap.

Ibalik lamang ang JSON:
{{
  "overall_summary": "summary dito",
  "values": [
    {{
      "name": "PangalanNgValue",
      "score": 4,
      "reason": "Simpleng paliwanag kung bakit ito tumutugma."
    }}
  ]
}}
"""
        else:
            prompt = f"""Based on the following user profile and choices, predict the person's core political values and beliefs.

User Profile:
Age: {age}
Gender: {gender}

Personality Test Answers:
{formatted_answers}

Selected Politician Statements:
{formatted_politicians}

Instructions:
- You may choose any meaningful political values (not limited to a list).
- For each value:
  - Give a score from 1 (very low) to 5 (very strong).
  - Explain why this value fits you (talk directly to the user).
  - Do NOT mention or reference any answer number or politician answer number.
  - Write the explanation in a very simple sentence so ordinary people can understand.

At the end, provide an **overall_summary** that explains *your* general political style (as if speaking directly to the user) in 1-3 very short sentences.

Return only a valid JSON:
{{
  "overall_summary": "short summary here",
  "values": [
    {{
      "name": "ValueName",
      "score": 4,
      "reason": "Simple explanation why this value fits you."
    }}
  ]
}}
"""

        response = model.generate_content(prompt, generation_config=generation_config)
        raw_text = response.text.strip()

        # Clean markdown if present
        cleaned = re.sub(r"^```(?:json)?|```$", "", raw_text, flags=re.IGNORECASE).strip()

        try:
            values = json.loads(cleaned)
        except json.JSONDecodeError as err:
            print("❌ JSON decode error:", err)
            return {"error": "Invalid JSON format", "raw_output": cleaned}

        # ✅ Save to MongoDB
        record = {
            "chatId": chat_id,
            "answers": answers,
            "politicianAnswers": politician_answers,
            "age": age,
            "gender": gender,
            "predicted_values": values,
            "timestamp": datetime.utcnow()
        }

        db["predicted_user_values"].insert_one(record)
        print(f"✅ Prediction saved to MongoDB → chatId: {chat_id}, answers: {len(answers)}, politicians: {len(politician_answers)}")
        return values

    except Exception as e:
        print(f"❌ Error: {e}")
        return {"error": str(e)}
