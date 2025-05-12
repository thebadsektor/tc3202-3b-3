import google.generativeai as genai
import os
import json
import re
from dotenv import load_dotenv
from datetime import datetime
from mongodb import db  # Make sure this imports your db connection

# Load environment variables
load_dotenv()
api_key = os.getenv("API_KEY")

# Configure Gemini
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

def predict_values_based_on_answers(answers, chat_id="anonymous", language="english"):
    try:
        print(f"🧠 Saving prediction for chatId: {chat_id} with language: {language}")

        # Check if prediction already exists
        existing = db["predicted_user_values"].find_one({"chatId": chat_id})
        if existing:
            print("⚠️ Reusing existing prediction from MongoDB")
            return existing["predicted_values"]

        formatted_answers = "\n".join([f"Answer {i+1}: {a}" for i, a in enumerate(answers)])

        # ✅ Language-based prompt selection
        if language.lower() == "tagalog":
            prompt = f"""Batay sa mga sumusunod na sagot sa mga tanong ng personality test, tukuyin at i-score ang mga pangunahing pinahahalagahan o paniniwala ng tao.

Mga tagubilin:
- Pumili ng anumang mga pinahahalagahan na makabuluhan (hindi limitado sa isang partikular na listahan).
- Para sa bawat pinahahalagahan:
  - Magbigay ng score mula 1 (pinakamababa) hanggang 5 (pinakamataas).
  - Magdagdag ng **maikli at simpleng Tagalog na paliwanag** kung bakit ito tumutugma. Iwasan ang malalalim o teknikal na salita.

Mga Sagot:
{formatted_answers}

Ibalik lamang ang isang wastong JSON na ganito ang format:

{{
  "values": [
    {{
      "name": "PangalanNgValue",
      "score": 4,
      "reason": "Maikling paliwanag dito."
    }}
  ]
}}
"""
        else:
            # default = english
            prompt = f"""Based on the following answers to personality test questions, identify and score the person's most relevant core values or beliefs.

Instructions:
- You can choose any values you find meaningful (not limited to a specific list).
- For each value:
  - Give a score from 1 (very low) to 5 (very strong).
  - Add a short explanation (1 sentence) in **simple English** explaining why it fits.

Answers:
{formatted_answers}

Return only a valid JSON with this format:

{{
  "values": [
    {{
      "name": "ValueName",
      "score": 4,
      "reason": "Short reason here."
    }}
  ]
}}
"""

        # Call Gemini
        response = model.generate_content(prompt)
        raw_text = response.text.strip()

        # Clean response (remove markdown formatting)
        cleaned = re.sub(r"^```(?:json)?|```$", "", raw_text, flags=re.IGNORECASE).strip()

        # Try finding the JSON object inside the response
        match = re.search(r'{\s*"values"\s*:\s*\[.*?\]\s*}', cleaned, re.DOTALL)
        if not match:
            print("❌ Could not extract valid JSON block.")
            return {"error": "Failed to extract JSON", "raw_output": raw_text}

        json_text = match.group()

        try:
            values = json.loads(json_text)
        except json.JSONDecodeError as err:
            print("❌ JSON decode error:", err)
            return {"error": "Invalid JSON format", "raw_output": json_text}

        # Save to DB
        record = {
            "chatId": chat_id,
            "answers": answers,
            "predicted_values": values,
            "timestamp": datetime.utcnow()
        }

        db["predicted_user_values"].insert_one(record)
        print("✅ Prediction saved to MongoDB")

        return values

    except Exception as e:
        print(f"❌ Error: {e}")
        return {"error": str(e)}
