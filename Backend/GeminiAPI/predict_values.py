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

        if language.lower() == "tagalog":
            prompt = f"""Batay sa mga sumusunod na impormasyon, tukuyin at i-score ang mga pangunahing pinahahalagahan o paniniwala ng tao.

Ibigay ang impormasyon sa ibaba bilang batayan:
Edad: {age}
Kasarian: {gender}

Mga sagot sa personal test:
{formatted_answers}

Mga piniling pananaw mula sa mga pahayag ng mga politiko:
{formatted_politicians}

Mga tagubilin:
- Pumili ng anumang mga values na makabuluhan (hindi limitado sa isang partikular na listahan).
- Para sa bawat value:
  - Magbigay ng score mula 1 (pinakamababa) hanggang 5 (pinakamataas).
  - Ang reason ay dapat malinaw na konektado sa pangalan ng value.
- Sa dulo, magbigay ng **overall_summary** na maikling naglalarawan ng kabuuang pananaw ng user (1-5 pangungusap lang).

Ibalik lamang ang isang wastong JSON sa ganitong format:
{{
  "overall_summary": "buod dito.",
  "values": [
    {{
      "name": "PangalanNgValue",
      "score": 4,
      "reason": "Paliwanag sa value name."
    }}
  ]
}}
"""
        else:
            prompt = f"""Based on the following combined user information, predict the person's core political values and beliefs.

Information to consider:
Age: {age}
Gender: {gender}

Answers to personality test questions:
{formatted_answers}

Selected politician answers during test:
{formatted_politicians}

Instructions:
- You can choose any values you find meaningful (not limited to a specific list).
- For each value:
  - Give a score from 1 (very low) to 5 (very strong).
  - The reason must clearly relate to the specific value name.
- At the end, provide an **overall_summary** that explains the user’s political outlook in 1-5 short sentences.

Return only a valid JSON:
{{
  "overall_summary": "summary sentence here. make it long",
  "values": [
    {{
      "name": "ValueName",
      "score": 4,
      "reason": "Explain the ValueName."
    }}
  ]
}}
"""

        response = model.generate_content(prompt)
        raw_text = response.text.strip()

        # Clean markdown if present
        cleaned = re.sub(r"^```(?:json)?|```$", "", raw_text, flags=re.IGNORECASE).strip()

        # Attempt to parse full response
        try:
            values = json.loads(cleaned)
        except json.JSONDecodeError as err:
            print("❌ JSON decode error:", err)
            return {"error": "Invalid JSON format", "raw_output": cleaned}

        # Save result
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
