# import google.generativeai as genai
# import os
# import pandas as pd
# from dotenv import load_dotenv

# load_dotenv()
# api_key = os.getenv("API_KEY")

# # Load your CSV file
# df = pd.read_csv("../politician_articles.csv")

# # Combine all article texts into one string
# combined_text = " ".join(df['article_text'].dropna())

# genai.configure(api_key=api_key)
# model = genai.GenerativeModel('gemini-1.5-flash')

# def generate_content():
#     try:
#         prompt = f"""
#                 Based on the following political article content, generate 10 personality test questions that reflect the underlying values, beliefs, or decision-making patterns evident in the text. Each question should assess a hypothetical situation and offer two answer choices. Use the format:
#                 Q: [Question]
#                 O1: [Option 1]
#                 O2: [Option 2]

#                 Questions should probe topics like integrity, leadership, public responsibility, national values, or how someone might respond in challenging societal or political situations.

#                 Here is the article content to use for inspiration:
#                 \"\"\"
#                 {combined_text[:4000]}
#                 \"\"\"

#                 Example:
#                 Q: When facing a crisis in leadership, what matters most to you?
#                 O1: Maintaining public trust and transparency
#                 O2: Ensuring quick, decisive action even without full disclosure
#                 """
#         response = model.generate_content(prompt)
#         return response.text
#     except Exception as e:
#         return str(e)

import google.generativeai as genai
import os
import pandas as pd
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
api_key = os.getenv("API_KEY")

# Set Gemini API key
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

# Dynamically build correct absolute path to CSV file
base_dir = os.path.dirname(os.path.abspath(__file__))  # /Backend/GeminiAPI
csv_path = os.path.abspath(os.path.join(base_dir, "..", "politician_articles.csv"))

# Load the CSV
try:
    df = pd.read_csv(csv_path)
except FileNotFoundError:
    raise FileNotFoundError(f"Could not find 'politician_articles.csv' at {csv_path}")

# Combine article content
combined_text = " ".join(df['article_text'].dropna())

# Content generation function
def generate_content():
    try:
        prompt = f"""
You are a political psychologist AI. Based on the following political article content, generate 10 personality test questions that reflect the underlying values, beliefs, or decision-making patterns evident in the text.

Each question should assess a hypothetical situation and offer two answer choices.
Use this format:

Q: [Question]  
O1: [Option 1]  
O2: [Option 2]  

The questions should probe themes such as:
- Integrity
- Leadership under pressure
- Civic responsibility
- Public transparency
- Societal fairness
- Ethical governance

Randomize your interpretation of the content and consider it as a collection of diverse, unordered political insights. Do not generate the same set of questions in repeated runs—use varied angles, phrasings, or values from different parts of the article content.

Here is the article content to use for inspiration:
\"\"\"
{combined_text[:4000]}
\"\"\"

Example format:
Q: When facing a crisis in leadership, what matters most to you?  
O1: Maintaining public trust and transparency  
O2: Ensuring quick, decisive action even without full disclosure
"""

        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return str(e)
