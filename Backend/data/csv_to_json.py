import csv
import json

input_csv = "../politician_articles.csv"  # <-- Change to your CSV filename
output_json = "politicians_matches.json"

data = {}

with open(input_csv, mode="r", encoding="utf-8") as csv_file:
    reader = csv.DictReader(csv_file)
    for row in reader:
        name = row.get("name") or row.get("Name")
        article = row.get("article_text") or row.get("Article") or ""
        if name and article:
            data[name.strip()] = article.strip()

# Save to JSON
with open(output_json, mode="w", encoding="utf-8") as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=2)

print(f"✅ Successfully converted {len(data)} entries to {output_json}")
