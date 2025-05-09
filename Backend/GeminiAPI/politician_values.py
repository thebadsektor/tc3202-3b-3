import os
import pandas as pd
import google.generativeai as genai
from dotenv import load_dotenv

def Politicians_Values():
    # Load environment variables
    load_dotenv()
    api_key = os.getenv("API_KEY")

    if not api_key:
        raise ValueError("❌ API_KEY not found in environment variables")

    # Configure Gemini
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash')

    # Dynamically resolve path to politician_articles.csv
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.abspath(os.path.join(base_dir, "..", "politician_articles.csv"))

    try:
        df = pd.read_csv(csv_path)
    except Exception as e:
        raise FileNotFoundError(f"❌ Failed to read CSV: {e}")

    # Group articles per candidate
    grouped = df.groupby('candidate_name')['article_text'].apply(lambda x: " ".join(x.dropna()))

    output = {}
    for candidate, articles in grouped.items():
        prompt = f"""
Analyze the following articles about {candidate} and summarize their most prominent core values and beliefs.

Text:
{articles[:3000]}

List 2 to 4 key personality traits or leadership qualities using clear, impactful, one- to two-word labels only.
Avoid long sentences. Stick to concise descriptors like:
- Visionary
- Transparent Leader
- Youth Advocate

Format:
{candidate}
    Trait1
    Trait2
    Trait3
"""

        try:
            response = model.generate_content(prompt)
            output[candidate] = response.text.strip()
        except Exception as e:
            output[candidate] = f"Error generating traits: {e}"

    return output
