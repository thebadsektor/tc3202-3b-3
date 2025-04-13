import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("API_KEY")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_content():
    try:
        prompt = """Generate 10 personality test questions with 2 options each.
        Format each question with 'Q:' prefix and options with 'O1:' and 'O2:'.
        Questions should assess values, beliefs, and situational responses.
        Example:
        Q: When making decisions, you primarily consider:
        O1: Logical analysis and facts
        O2: Emotional impact on people involved"""
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return str(e)