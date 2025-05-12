import os
import pandas as pd
import random
import google.generativeai as genai
from dotenv import load_dotenv

# Load API key from .env
load_dotenv()
api_key = os.getenv("API_KEY")
genai.configure(api_key=api_key)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-1.5-flash')

# Path to CSV
base_dir = os.path.dirname(os.path.abspath(__file__))
data_dir = os.path.join(base_dir, "..", "data")
csv_path = os.path.join(data_dir, "politician_articles.csv")

def load_articles_by_candidate(path):
    try:
        df = pd.read_csv(path)
        grouped = df.groupby('candidate_name')['article_text'].apply(lambda texts: " ".join(texts.dropna())).reset_index()
        return grouped
    except Exception as e:
        print(f"❌ Error reading CSV: {e}")
        return pd.DataFrame()

def generate_statement_from_two_articles(article_a, article_b, language='english'):
    article_a = article_a[:2000]  # Safety limit
    article_b = article_b[:2000]

    if language.lower() == 'tagalog':
        prompt = f"""
Ikaw ay isang AI political psychologist. Narito ang dalawang artikulo mula sa magkaibang kandidato.

Gumawa ng **10 tanong** para sa personality test.
- Para sa bawat tanong magbigay ng dalawang pagpipilian (O1 at O2).
- Gamitin ang dalawang artikulo bilang inspirasyon ngunit dapat maging pangkalahatang ideya lamang.
- Ang parehong pagpipilian ay dapat **parehong positibo** o **parehong negatibo** (hindi halo).
- Huwag banggitin ang pangalan ng kandidato o source.
- Gumamit ng simpleng Tagalog.

Format:
[Statement]
O1: [Pagpipilian 1]
O2: [Pagpipilian 2]

Kandidato A article:
\"\"\"  
{article_a}  
\"\"\"

Kandidato B article:
\"\"\"  
{article_b}  
\"\"\"
"""
    else:
        prompt = f"""
You are an AI political psychologist. You are given article content from 2 different political candidates.

Task:
- Write **10 personality-assessing statements** about political values or beliefs.
- For each statement provide 2 answer options (O1 and O2).
- Use both articles as inspiration, but write options as general political ideas.
- Both options must be either both positive OR both negative (never mixed).
- Do NOT mention any politician, candidate, or article source.
- Use very simple, easy English (assume the reader has low political knowledge).

Output format:
[Statement]
O1: [Option 1]
O2: [Option 2]

Candidate A article:
\"\"\"  
{article_a}  
\"\"\"

Candidate B article:
\"\"\"  
{article_b}  
\"\"\"
"""

    response = model.generate_content(prompt)
    return response.text.strip()

def generate_politician_statements(language='english'):
    df_candidates = load_articles_by_candidate(csv_path)
    if len(df_candidates) < 2:
        raise Exception("Not enough candidates to create pairs.")

    candidates_list = df_candidates.sample(frac=1).reset_index(drop=True)
    candidate_a = candidates_list.iloc[0]
    candidate_b = candidates_list.iloc[1]
    article_a = candidate_a['article_text']
    article_b = candidate_b['article_text']

    return generate_statement_from_two_articles(article_a, article_b, language=language)

if __name__ == "__main__":
    df_candidates = load_articles_by_candidate(csv_path)
    if len(df_candidates) < 2:
        print("❌ Not enough candidates to create pairs.")
    else:
        candidate_a = df_candidates.iloc[0]
        candidate_b = df_candidates.iloc[1]
        article_a = candidate_a['article_text']
        article_b = candidate_b['article_text']
        statement = generate_statement_from_two_articles(article_a, article_b, language='english')
        print(statement)
