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
    article_a = article_a[:2000]
    article_b = article_b[:2000]

    generation_config = {"temperature": 0.4}  # ✅ recommended lower temperature

    if language.lower() == 'tagalog':
        prompt = f"""
Ikaw ay isang AI political psychologist. Narito ang dalawang artikulo mula sa magkaibang kandidato.

Gumawa ng **10 tanong** para sa personality test.
- Para sa bawat tanong, gumawa ng isang statement at dalawang pagpipilian (O1 at O2).
- Lahat ng statement at pagpipilian ay dapat manggaling lamang sa mga ideya, paniniwala, o patakaran na binanggit sa mga artikulo.
- Huwag mag-imbento ng mga bagong paksa o ideya.
- Ang parehong pagpipilian ay dapat **parehong positibo** o **parehong negatibo** (hindi halo).
- Huwag banggitin ang pangalan ng kandidato o source.
- Gumamit ng simpleng Tagalog.

Halimbawa:
Article A binanggit ang kalusugan, Article B binanggit ang edukasyon.

Output:
Topic : [paraa saan ang statement]
O1: Suportahan ang pagpapalawak ng pampublikong ospital para sa mahihirap.
O2: Ituon ang pondo ng gobyerno sa pagpapahusay ng kalidad ng pampublikong edukasyon.

Format:
Topic : [paraa saan ang statement]
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

Your task:
- Write **10 personality-assessing statements** about political values or beliefs.
- Each statement must present one question and two answer options (O1 and O2).
- The statements and options must ONLY use ideas, beliefs, or policies explicitly mentioned in either article.
- Do not invent unrelated ideas.
- Both answer options must be either both positive OR both negative (never mixed).
- Do NOT mention any candidate name or article source.
- Use very simple, easy English (assume low political knowledge).

Example:
Article A mentions public health, Article B mentions education.

Output:
Topic : [statements about]
O1: Support expanding public hospitals to serve low-income citizens.
O2: Focus government resources on improving public school quality.

Output format:
Topic : [statements about]
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

    response = model.generate_content(prompt, generation_config=generation_config)
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
