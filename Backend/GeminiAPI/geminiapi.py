from flask import Flask, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import os
import re

# Load environment variables from .env file
load_dotenv()

# Retrieve the API key from environment variables
api_key = os.getenv("API_KEY")

# Initialize Flask app
app = Flask(__name__)

CORS(app)  

# Initialize the client with the API key
client = genai.Client(api_key=api_key)

# Generate content from the model
@app.route('/get-statements', methods=['GET'])
def get_statements():
    # Generate content
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=["Please generate a 10 set of personality test questions based on values and beliefs, incorporating situational scenarios. For each question, provide two options. Do not include any introductions, and for options don't inlucde a A) or a) and B) or b). Just list the questions and their options."]
    )

    # Split into lines and clean the statements
    statements = response.text.split('\n')
    cleaned_statements = []

    for statement in statements:
        cleaned_statement = re.sub(r'^\d+\.\s*', '', statement).strip()
        if cleaned_statement:
            cleaned_statements.append(cleaned_statement)

    # Return as JSON response
    print(cleaned_statements + "\n")
    return jsonify(cleaned_statements)

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # You can use any port you prefer
