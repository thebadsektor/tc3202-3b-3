import os
import pandas as pd
import google.generativeai as genai
from random import sample

from dotenv import load_dotenv

# Load environment variables
load_dotenv()
api_key = os.getenv("API_KEY")
genai.configure(api_key=api_key)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-1.5-flash')

# Path-safe loading of the CSV file
base_dir = os.path.dirname(os.path.abspath(__file__))  # /Backend/GeminiAPI
csv_path = os.path.abspath(os.path.join(base_dir, "..", "politician_articles.csv"))

# Read and combine article content
try:
    df = pd.read_csv(csv_path, encoding="latin1")  # or encoding="ISO-8859-1"
    combined_text = " ".join(df['article_text'].dropna())
except FileNotFoundError:
    raise FileNotFoundError(f"Could not find 'cleaned_utf8_file.csv' at {csv_path}")
except UnicodeDecodeError:
    raise UnicodeDecodeError("Failed to decode 'cleaned_utf8_filecleaned_utf8_file.csv'. Try re-saving as UTF-8.")
except Exception as e:
    combined_text = ""
    print(f"❌ Error loading articles: {e}")


# Core comparison function
def generate_user_politician_comparison(user_values):
    try:
        if not combined_text:
            return "Error: No article data found."

        if not user_values:
            return "Error: No user values provided."

        # Print the predicted user values
        print("\n🔍 Predicted User Values:")
        for val in user_values:
            print(f" - {val}")

        # Analyze article length per politician
        grouped = df.groupby('candidate_name')['article_text'].apply(lambda x: " ".join(x.dropna()))
        word_counts = {name: len(text.split()) for name, text in grouped.items()}

        print("\n📊 Word Count Per Politician:")
        for name, count in word_counts.items():
            print(f" - {name}: {count} words")

        # Group all articles by candidate
        grouped = df.groupby('candidate_name')['article_text'].apply(lambda x: " ".join(x.dropna()))

        # Sample 4-5 politicians randomly
        sampled_texts = sample(grouped.tolist(), k=min(5, len(grouped)))

        # Combine and slice the content
        text_to_use = " ".join(sampled_texts)[:4000]

        print("\n📄 Article Content Sent to Gemini (First 500 chars):")
        print(text_to_use[:500] + "...")

        # Compose the Gemini prompt
        prompt = f"""
You are a political analyst AI. Your task is to compare the user's predicted values with the inferred values and priorities of various Filipino politicians based on article content.

---

🔍 The user's predicted values are:
{user_values}

📄 Below is a collection of article content, each containing insights into the beliefs, actions, and public statements of various politicians.

---

Your task:

1. Identify **up to 5 politicians** whose values **significantly overlap** with the user's. Do not stop at the first match.
2. Consider alignment meaningful if the politician shares **at least two values** with the user (you may infer values from their actions, policies, or language in the text).
3. Rank them **from most to least aligned**, based on how many values match and how strongly they express those values.
4. For each politician, explain your reasoning clearly — reference themes or phrases from the article where possible.
5. Do **not include** any politician who does not align with at least two user values.

---

✍️ Format your response exactly like this:

1. [Politician Name]  
Reason: [Brief explanation why their values align with the user's values]

---

📜 Article Content to Analyze:
\"\"\" 
{text_to_use}
\"\"\"
"""


        # Generate Gemini response
        response = model.generate_content(prompt)

        print("\n🤖 Gemini Response:")
        print(response.text.strip())

        return response.text

    except Exception as e:
        return f"❌ Error generating Gemini content: {str(e)}"