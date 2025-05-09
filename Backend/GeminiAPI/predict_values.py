import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Retrieve the API key from environment variables
api_key = os.getenv("API_KEY")

# Configure the Gemini client
genai.configure(api_key=api_key)

# Initialize the model
model = genai.GenerativeModel('gemini-1.5-flash')  # or 'gemini-pro'

def predict_values_based_on_answers(answers):
    try:
        # Join the user answers into a format that Gemini can process
        formatted_answers = "\n".join([f"Answer {i+1}: {answer}" for i, answer in enumerate(answers)])

        prompt = f"""Based on the following answers to personality test questions, identify and list only the most prominent core values and beliefs — the ones that are clearly emphasized or have the highest scores:

        {formatted_answers}

        Return only a bulleted list of core values (e.g., Ambition, Honesty, Caring). 
        Do not include any explanations or additional text. Just output the values."""

        # Call the Gemini API
        response = model.generate_content(prompt)
        
        return response.text
    except Exception as e:
        return f"Error in prediction: {str(e)}"
