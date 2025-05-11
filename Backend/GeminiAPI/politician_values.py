import os
import pandas as pd
import google.generativeai as genai
from dotenv import load_dotenv

def Politicians_Values(language='english'):
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
    data_dir = os.path.join(base_dir, "..", "data")
    csv_path = os.path.join(data_dir, "politician_articles.csv")
    try:
        df = pd.read_csv(csv_path)
    except Exception as e:
        raise FileNotFoundError(f"❌ Failed to read CSV: {e}")

    # Group articles per candidate
    grouped = df.groupby('candidate_name')['article_text'].apply(lambda x: " ".join(x.dropna()))

    output = {}
    for candidate, articles in grouped.items():
        if language.lower() == 'tagalog':
            prompt = f"""
I-analyze ang mga sumusunod na artikulo tungkol kay {candidate} at ibuod ang kanilang mga pangunahing pinahahalagahan at paniniwala.

Teksto:
{articles[:3000]}

Magbigay ng 2 hanggang 4 na pangunahing katangian o kalidad ng pamumuno gamit lamang ang malinaw at simpleng dalawang salita o phrase bawat isa. Iwasan ang mahahaba o malalalim na salita. Gamitin lamang ang karaniwang Tagalog na madaling maintindihan.

Halimbawa:
- Visionaryo
- Tapat na Lider
- Tagapagtanggol ng Kabataan

Format ng output:
{candidate}
    Katangian1
    Katangian2
    Katangian3
"""
        else:
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
