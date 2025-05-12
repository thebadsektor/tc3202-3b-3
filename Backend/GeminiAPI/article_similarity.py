from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from mongodb import db

def get_similar_articles(chat_id, top_n=5):
    print(f"\n🔎 [article_similarity] Fetching articles for chatId: {chat_id}")

    # ✅ 1. Get politicianAnswers from MongoDB
    record = db["predicted_user_values"].find_one({"chatId": chat_id})
    if not record:
        print(f"❌ No record found for chatId: {chat_id}")
        return []

    politician_answers = record.get("politicianAnswers", [])
    print(f"✅ Found record. politicianAnswers length: {len(politician_answers)}")
    if not politician_answers:
        print("⚠️ politicianAnswers array is empty.")
        return []

    # ✅ 2. Load articles CSV
    try:
        articles_df = pd.read_csv("data/politician_articles.csv", encoding='utf-8')
        print(f"✅ Loaded politician_articles.csv → rows: {len(articles_df)}")
    except Exception as e:
        print(f"❌ Error loading politician_articles.csv: {str(e)}")
        return []

    # ✅ 3. Prepare query text
    query = " ".join(politician_answers)
    print(f"✅ Combined query text length: {len(query)} characters")

    # ✅ 4. TF-IDF similarity
    texts = articles_df['article_text'].astype(str).tolist() + [query]
    vectorizer = TfidfVectorizer().fit_transform(texts)
    cosine_sim = cosine_similarity(vectorizer[-1], vectorizer[:-1])
    print("✅ TF-IDF + cosine similarity calculated")

    # ✅ 5. Get top N articles
    top_indices = cosine_sim[0].argsort()[-top_n:][::-1]
    print(f"✅ Top article indices: {top_indices}")
    top_articles = articles_df.iloc[top_indices]

    # ✅ 6. Return article info
    results = []
    for _, row in top_articles.iterrows():
        results.append({
            "article_title": row.get("article_title", ""),
            "article_text": row.get("article_text", "")[:500] + "...",
            "source_url": row.get("source_url", "#")
        })

    print(f"✅ Returning {len(results)} matching articles.\n")
    return results
