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
    df = pd.read_csv(csv_path)
    combined_text = " ".join(df['article_text'].dropna())
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
You are a political analyst AI. Your task is to analyze and compare the user's predicted values with the values of various Filipino politicians.

The user's predicted values are:
{user_values}

Using the following article content (which contains insights into the values, beliefs, and actions of various politicians), do the following:

1. Identify the politicians whose values **closely align** with the user's.
2. Rank only those politicians from most aligned to least aligned — include **only those with meaningful alignment**.
3. For each ranked politician, explain clearly why their values match the user's, using specific references or inferred themes from the article content.
4. Exclude any politician who does **not meaningfully align** with the user's values.
5. Format the output exactly as follows:

1. [Politician Name]  
Reason: [Concise explanation based on article content]

Here is the article content to analyze:
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
