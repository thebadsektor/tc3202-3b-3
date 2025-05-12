import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
api_key = os.getenv("API_KEY")

# Set Gemini API key
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_content(language='english', seed=None):
    try:
        if seed is not None:
            import random
            random.seed(seed)

        if language.lower() == 'tagalog':
            prompt = """
Ikaw ay isang AI na eksperto sa political psychology. Bumuo ng 10 simpleng tanong para sa isang political values test. Ang bawat tanong ay dapat magpakita ng isang sitwasyon tungkol sa gobyerno, lipunan, o pamumuno, at magbigay ng dalawang **positibo at makatwirang** pagpipilian. 

Minsan, maaari ka ring magbigay ng tanong kung saan parehong hindi kanais-nais ang dalawang pagpipilian, basta't pareho silang patas na negatibo. Huwag kailanman gumawa ng tanong na isang maganda at isang masama lang ang pagpipilian.

Iwasang gumamit ng malalim o mahirap na salita. Ang mga tanong ay dapat madaling maintindihan ng karaniwang tao.

Mga tema ng tanong:
- Pamumuno at gobyerno
- Responsibilidad ng mamamayan
- Pagkakapantay-pantay at katarungan
- Seguridad at kalayaan
- Kalikasan at ekonomiya

Format ng output:
Q: [Tanong]  
O1: [Pagpipilian 1]  
O2: [Pagpipilian 2]
"""
        else:
            prompt = """
You are an AI expert in political psychology. Make 10 very simple questions for a political values test. Each question should give a situation about government, society, or leadership, and offer two **positive and reasonable** choices.

In rare cases, you may also create a question with two equally bad choices. But only if both are fairly negative options. Never give one good and one bad option.

Do not use hard or technical words. Write for people with basic understanding only.

Topics to include:
- Leadership and government
- Responsibility of citizens
- Fairness and justice
- Safety and freedom
- Environment and economy

Use this exact output format:
Q: [Question]  
O1: [Option 1]  
O2: [Option 2]

Example:
Q: As a leader, what matters most to you?  
O1: Being open and honest with people  
O2: Taking fast action to solve problems
"""

        response = model.generate_content(prompt, generation_config={"temperature": 0.9})
        return response.text

    except Exception as e:
        return str(e)

if __name__ == "__main__":
    output = generate_content(language='english')  # or 'tagalog'
    print(output)
