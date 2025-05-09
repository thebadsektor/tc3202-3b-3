import chardet
import pandas as pd

# 🔁 Replace with your actual CSV path
input_path = "candidates.csv"
output_path = "cleaned_utf8_file.csv"

# Step 1: Detect encoding
with open(input_path, 'rb') as f:
    raw_data = f.read()
    result = chardet.detect(raw_data)
    detected_encoding = result['encoding']
    print(f"📌 Detected encoding: {detected_encoding}")

# Step 2: Read using detected encoding
df = pd.read_csv(input_path, encoding=detected_encoding)

# Step 3: Save as UTF-8
df.to_csv(output_path, encoding='utf-8', index=False)
print(f"✅ Saved cleaned UTF-8 CSV to: {output_path}")
