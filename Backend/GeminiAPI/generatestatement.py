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
data_dir = os.path.join(base_dir, "..", "data")        # ✅ go up → data folder
csv_path = os.path.join(data_dir, "politician_articles.csv")

# Load the CSV
try:
    df = pd.read_csv(csv_path)
except FileNotFoundError:
    raise FileNotFoundError(f"Could not find 'politician_articles.csv' at {csv_path}")

# Combine article content
combined_text = " ".join(df['article_text'].dropna())

# ✅ Content generation function with language option
def generate_content(language='english'):
    try:
        if language.lower() == 'tagalog':
            prompt = f"""
Ikaw ay isang AI na politikal na psychologist. Batay sa mga sumusunod na artikulo, bumuo ng 10 tanong para sa personality test na sumasalamin sa mga pangunahing pinahahalagahan, paniniwala, o pattern ng pagdedesisyon na makikita sa nilalaman.

Ang bawat tanong ay dapat magpakita ng isang hypothetical na sitwasyon at magbigay ng dalawang **parehong positibo at makatwirang** pagpipilian ng sagot na sumasalamin sa magkaibang pananaw o prayoridad. Iwasan ang paggamit ng malalalim o teknikal na salita; gumamit lamang ng simpleng Tagalog na madaling maintindihan ng karaniwang Pilipino.

Gamitin ang format na ito:

Q: [Tanong]  
O1: [Pagpipilian 1]  
O2: [Pagpipilian 2]  

Ang mga tanong ay dapat umiikot sa mga tema tulad ng:
- Integridad
- Pamumuno sa panahon ng krisis
- Pananagutang sibiko
- Transparency sa gobyerno
- Pagkakapantay-pantay sa lipunan
- Mabuting pamamahala

Siguraduhin na ang parehong O1 at O2 ay nagpapakita ng makatwirang pananaw upang hikayatin ang malalim na pag-iisip, hindi obvious na tamang sagot.

Narito ang artikulo na gagamitin bilang inspirasyon:
\"\"\"  
{combined_text[:4000]}  
\"\"\"

Halimbawa ng format:
Q: Kapag may krisis sa pamumuno, ano ang mas mahalaga para sa iyo?  
O1: Panatilihin ang tiwala ng publiko at transparency  
O2: Mabilis at maayos na aksyon kahit hindi kumpleto ang impormasyon
"""
        else:
            prompt = f"""
You are a political psychologist AI. Based on the following political article content, generate 10 personality test questions that reflect the underlying values, beliefs, or decision-making patterns evident in the text.

Each question should assess a hypothetical situation and offer two **equally positive and reasonable** answer choices that reflect different values or priorities—there should be no clearly right or wrong answer.
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
and more ...

Make sure both O1 and O2 represent valid perspectives to encourage thoughtful choices, not obvious ones.

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
