# from flask import Flask, jsonify
# from flask_cors import CORS
# from google import genai
# from dotenv import load_dotenv
# import os
# import re
# import json
# import time

# # Load environment variables from .env file
# load_dotenv()

# # Retrieve the API key from environment variables
# api_key = os.getenv("API_KEY")

# # Initialize Flask app
# app = Flask(__name__)

# CORS(app)

# # Initialize the client with the API key
# client = genai.Client(api_key=api_key)

# # Function to generate the content
# def generate_content():
#     try:
#         response = client.models.generate_content(
#             model="gemini-2.0-flash",
#             contents=["Please generate random set of 10 personality test questions based on values and beliefs, incorporating situational scenarios. For each question, provide two options. For each question, prefix it with 'Q:' and for each option, prefix it with 'O1' for the first option and 'O2' for the second option. Do not include any introductions, and do not include any numbers. Just list the questions and their options in the requested format."]
#         )
#         return response.text
#     except Exception as e:
#         return str(e)

# # Endpoint to get statements (questions)
# @app.route('/get-statements', methods=['GET'])
# def get_statements():
#     print("Regenerating questions")

#     # Directly regenerate content each time
#     generated_content = generate_content()

#     # Split into lines and clean the statements
#     statements = generated_content.split('\n')
#     cleaned_statements = []

#     for statement in statements:
#         cleaned_statement = statement.strip()
#         if cleaned_statement:
#             cleaned_statements.append(cleaned_statement)

#     # Return the fresh set of statements as JSON
#     return jsonify(cleaned_statements)


# if __name__ == '__main__':
#     app.run(debug=True, port=5000)  # You can use any port you prefer


# #Code ni Gabot-----------------------------------------
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