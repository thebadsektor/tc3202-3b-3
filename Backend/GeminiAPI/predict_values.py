from google import genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Retrieve the API key from environment variables
api_key = os.getenv("API_KEY")

# Initialize the Gemini client
client = genai.Client(api_key=api_key)

def predict_values_based_on_answers(answers):
    try:
        # Join the user answers into a format that Gemini can process
        formatted_answers = "\n".join(answers)

        # Call the Gemini API to predict values or beliefs based on the answers
        response = client.models.generate_content(
            model="gemini-2.0-flash",  # Choose the appropriate model for your use case
            contents=[f"Based on the following answers, predict the values or beliefs the person holds:\n{formatted_answers}"]
        )

        # Extract the text response from Gemini's API
        if response and response.text:
            predicted_values = response.text.strip()  # Trim extra spaces and newlines
        else:
            predicted_values = "Unable to predict values based on provided answers."

        return predicted_values
    except Exception as e:
        return str(e)
