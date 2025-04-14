import google.generativeai as genai
import os
from dotenv import load_dotenv
import fitz  # PyMuPDF

# Load API key from .env
load_dotenv()
api_key = os.getenv("API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-1.5-flash')

def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

def generate_politician_statements(pdf_path="../../politicians.pdf"):
    try:
        file_text = extract_text_from_pdf(pdf_path)
        
        prompt = (
            "Based on the following document content, generate 20 insightful statements. " \
            "Note: don't include the intoduction just give directly the statements"
            "Do not mention any politician's name or the source of the content.\n\n"
            f"{file_text}"
        )
        
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return str(e)
