from .db import db

def save_recommendations_to_mongo(response_text):
    if db is not None:
        recommendations_collection = db['recommendations']
        lines = response_text.strip().split('\n')
        current_politician = None

        for line in lines:
            if line.startswith(tuple(str(i) for i in range(1, 21))):
                try:
                    name_part = line.split('. ', 1)[1]
                    name_score = name_part.rsplit('(Score:', 1)
                    name = name_score[0].strip()
                    score = int(name_score[1].replace(')', '').strip())
                    current_politician = {'name': name, 'score': score, 'reason': ''}
                except Exception as e:
                    print(f"❌ Parsing error: {e}")
            elif line.startswith("Reason:") and current_politician:
                reason = line.replace("Reason:", "").strip()
                current_politician['reason'] = reason
                recommendations_collection.insert_one(current_politician)
                current_politician = None
