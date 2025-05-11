import os
import pandas as pd
import google.generativeai as genai
from dotenv import load_dotenv

# Load API key from .env
load_dotenv()
api_key = os.getenv("API_KEY")
genai.configure(api_key=api_key)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-1.5-flash')

# Safely build path to CSV regardless of working directory
base_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.abspath(os.path.join(base_dir, "..", "politician_articles.csv"))

# Function to extract text from the CSV
def extract_text_from_csv(path):
    try:
        df = pd.read_csv(path)
        return " ".join(df['article_text'].dropna())
    except Exception as e:
        print(f"❌ Error reading CSV: {e}")
        return ""

# Main function to generate personality statements
def generate_politician_statements():
    try:
        content_text = extract_text_from_csv(csv_path)
        content_text = content_text[:4000]  # Truncate for Gemini prompt limit

        prompt = f"""
You are an AI political psychologist. Based on the following political article content, generate 10 personality-assessing statements.

Each statement should present a topic followed by two answer choices labeled O1 and O2:
- Only one option should reflect the values, beliefs, or ideals found in the article.
- The other option should offer a contrasting but still positively phrased perspective.
- Do not include any politician names or source references.
- Do not add introductory text or summaries — only output the 10 statements in the exact format below.
- Keep the tone balanced and neutral.


Format:
[Statement]
O1: [Aligned with article]
O2: [Contrasting but positive]

Here is the article content to inspire the values:
\"\"\"
{content_text}
\"\"\"
"""

        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return f"❌ Error generating content: {e}"



# import google.generativeai as genai
# import os
# import pandas as pd
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()
# api_key = os.getenv("API_KEY")

# # Configure Gemini API
# genai.configure(api_key=api_key)
# model = genai.GenerativeModel('gemini-1.5-flash')

# # Load the CSV file
# df = pd.read_csv("../politician_articles.csv")

# # Combine all article texts into one string
# combined_text = " ".join(df['article_text'].dropna())

# def generate_politician_statements():
#     try:
#         prompt = f"""
#         Based on the following political article content, generate 10 personality-assessing statements. 
#         Each statement should be followed by two options, labeled O1 and O2. 
#         Only one of the two options should reflect the values, beliefs, or ideas found in the content. 
#         The other option should be a contrasting perspective, but both must be phrased positively to avoid obvious bias. 
#         Do not include any politician names or specific sources.

#         Format:
#         [Category]
#         O1: [Positive Option aligned with article]
#         O2: [Positive Option NOT aligned with article]

#         Here is the article content to use for inspiration:
#         \"\"\"
#         {combined_text[:4000]}
#         \"\"\"


#         """
#         response = model.generate_content(prompt)
#         return response.text
#     except Exception as e:
#         return str(e)



# import os
# import pandas as pd
# import google.generativeai as genai
# from dotenv import load_dotenv

# # Load API key from .env
# load_dotenv()
# api_key = os.getenv("API_KEY")
# genai.configure(api_key=api_key)

# # Initialize Gemini model
# model = genai.GenerativeModel('gemini-1.5-flash')

# # Function to extract text from a CSV file
# def extract_text_from_csv(csv_path):
#     try:
#         df = pd.read_csv(csv_path)
#         return " ".join(df['article_text'].dropna())
#     except Exception as e:
#         print(f"Error reading CSV: {e}")
#         return ""

# # Main function to generate statements and options
# def generate_politician_statements(csv_path):
#     try:
#         content_text = extract_text_from_csv(csv_path)
#         content_text = content_text[:4000]  # Truncate to fit prompt limits

#         prompt = (
#             "Based on the following document content, generate 10 personality-assessing statements. 
#             Each statement should be followed by two options, labeled O1 and O2. 
#             Only one of the two options should reflect the values, beliefs, or ideas found in the content. 
#             The other option should be a contrasting perspective, but both must be phrased positively to avoid obvious bias. 
#             Do not include any politician names or specific sources.\n\n
#             Format:\n
#             Statement 1\n
#             O1: [Positive Option aligned with article]\n
#             O2: [Positive Option NOT aligned with article]\n\n
#             Here is the article content:\n
#             f"{content_text}"
#         )

#         response = model.generate_content(prompt)
#         return response.text

#     except Exception as e:
#         return f"Error: {e}"