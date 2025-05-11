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
data_dir = os.path.join(base_dir, "..", "data")
csv_path = os.path.join(data_dir, "politician_articles.csv")

def extract_text_from_csv(path):
    try:
        df = pd.read_csv(path)
        return " ".join(df['article_text'].dropna())
    except Exception as e:
        print(f"❌ Error reading CSV: {e}")
        return ""

def generate_politician_statements(language='english'):
    try:
        content_text = extract_text_from_csv(csv_path)
        content_text = content_text[:4000]  # Truncate for Gemini prompt limit

        if language.lower() == 'tagalog':
            prompt = f"""
Ikaw ay isang AI political psychologist. Batay sa mga sumusunod na nilalaman ng mga artikulo, bumuo ng 10 personality-assessing statements.

Ang bawat statement ay dapat magbigay ng isang tanong na sinusundan ng dalawang pagpipilian na may label na O1 at O2:
- Isa lamang ang dapat tumugma sa mga pinahahalagahan, paniniwala, o ideya sa artikulo.
- Ang isa naman ay dapat magbigay ng kabaligtarang pananaw ngunit parehong positibo ang tono.
- Huwag gumamit ng malalim o teknikal na Tagalog. Gumamit lamang ng simpleng Tagalog na madaling maintindihan ng karaniwang Pilipino.
- Huwag maglagay ng pangalan ng politiko o reference ng source.
- Huwag maglagay ng introduction o summary — ibigay lamang ang 10 statements sa eksaktong format.

Format ng output:
[Statement]
O1: [Tugma sa article]
O2: [Kabaligtaran ngunit positibo]

Narito ang nilalaman ng artikulo para gamitin bilang inspirasyon:
\"\"\"
{content_text}
\"\"\"
"""
        else:
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
