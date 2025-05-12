from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from mongodb import db

def get_similar_articles(chat_id, top_n=5):
    # ✅ 1. Get politicianAnswers from MongoDB
    record = db["predicted_user_values"].find_one({"chatId": chat_id})
    if not record:
        return []

    politician_answers = record.get("politicianAnswers", [])
    if not politician_answers:
        return []

    # ✅ 2. Load articles CSV
    articles_df = pd.read_csv("data/politician_articles.csv", encoding='utf-8')

    # ✅ 3. Prepare query text
    query = " ".join(politician_answers)

    # ✅ 4. TF-IDF similarity
    texts = articles_df['article_text'].astype(str).tolist() + [query]
    vectorizer = TfidfVectorizer().fit_transform(texts)
    cosine_sim = cosine_similarity(vectorizer[-1], vectorizer[:-1])

    # ✅ 5. Get top N articles
    top_indices = cosine_sim[0].argsort()[-top_n:][::-1]
    top_articles = articles_df.iloc[top_indices]

    # ✅ 6. Return article info
    results = []
    for _, row in top_articles.iterrows():
        results.append({
            "article_title": row.get("article_title", ""),
            "article_text": row.get("article_text", "")[:500] + "...",
            "source_url": row.get("source_url", "#")
        })

    return results
