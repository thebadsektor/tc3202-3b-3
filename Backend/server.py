from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid
from dotenv import load_dotenv
from mongodb import db

from GeminiAPI.generatestatement import generate_content
from GeminiAPI.predict_values import predict_values_based_on_answers
from GeminiAPI.politician_statements import generate_politician_statements
from model.match_candidates import match_candidates
from GeminiAPI.politician_values import Politicians_Values 
from GeminiAPI.politician_comparison import generate_user_politician_comparison
from GeminiAPI.get_politician_matches import get_matching_politicians
from GeminiAPI.candidate_utils import enrich_with_candidate_data

app = Flask(__name__)
CORS(app)
load_dotenv()

@app.route('/', methods=['GET'])
def home():
    return "✅ Personality API is running!"

# ✅ Updated: /get-statements
@app.route('/get-statements', methods=['GET'])
def get_statements():
    try:
        language = request.args.get("language", "english")
        print(f"Regenerating statements in {language}")
        generated_content = generate_content(language=language)
        statements = generated_content.split('\n')
        cleaned_statements = [s.strip() for s in statements if s.strip()]
        return jsonify(cleaned_statements)
    except Exception as e:
        return jsonify({'error': 'Error generating statements: ' + str(e)}), 500

# ✅ Updated: /get-politician-statements
@app.route('/get-politician-statements', methods=['GET'])
def get_politician_statements():
    try:
        language = request.args.get("language", "english")
        generated_content = generate_politician_statements(language=language)
        statements = generated_content.split('\n')
        cleaned_statements = [s.strip() for s in statements if s.strip()]
        return jsonify(cleaned_statements)
    except Exception as e:
        return jsonify({'error': 'Error generating politician statements: ' + str(e)}), 500

# ✅ Updated: /predict-values
@app.route('/predict-values', methods=['POST'])
def predict_values():
    try:
        data = request.get_json(silent=True) or {}
        if not data or 'answers' not in data:
            return jsonify({'error': 'No answers provided'}), 400

        answers = data['answers']
        language = data.get('language', 'english')
        chat_id = str(uuid.uuid4())

        predicted_values = predict_values_based_on_answers(
            answers, chat_id=chat_id, language=language
        )

        print("📊 Predicted Values:", predicted_values)

        db["predicted_user_values"].insert_one({
            "chatId": chat_id,
            "answers": answers,
            "predicted_values": predicted_values
        })

        return jsonify({
            'chatId': chat_id,
            'predicted_values': predicted_values
        })

    except Exception as e:
        print("❌ Server error:", str(e))
        return jsonify({'error': 'Error predicting values: ' + str(e)}), 500

@app.route('/get-predicted-values/<chat_id>', methods=['GET'])
def get_predicted_values(chat_id):
    try:
        record = db["predicted_user_values"].find_one({"chatId": chat_id})
        if not record:
            return jsonify({'error': 'Prediction not found'}), 404

        return jsonify({
            'chatId': chat_id,
            'predicted_values': record.get("predicted_values", {}),
            'answers': record.get("answers", [])
        })
    except Exception as e:
        return jsonify({'error': f'Failed to fetch prediction: {str(e)}'}), 500

@app.route('/match-based-on-answers', methods=['POST'])
def match_based_on_answers():
    try:
        data = request.get_json()
        if not data or 'answers' not in data:
            return jsonify({'error': 'No answers provided'}), 400

        answers = data['answers']
        language = data.get("language", "english")
        raw_values_dict = predict_values_based_on_answers(answers, language=language)

        if isinstance(raw_values_dict, dict):
            predicted_values = list(raw_values_dict.keys())
        else:
            return jsonify({'error': 'Could not extract predicted values'}), 500

        matched = match_candidates(predicted_values, csv_path="../../senator_candidates.csv")

        return jsonify({
            'predicted_values': predicted_values,
            'matches': matched
        })

    except Exception as e:
        return jsonify({'error': 'Error matching candidates: ' + str(e)}), 500

# ✅ Updated: /get-matching-politicians
@app.route('/get-matching-politicians/<chat_id>', methods=['GET'])
def get_matching_politicians_route(chat_id):
    try:
        language = request.args.get("language", "english")
        print(f"🔍 Fetching matches for chatId: {chat_id} in {language}")
        matches = get_matching_politicians(chat_id, language=language)

        return jsonify({
            "chatId": chat_id,
            "matches": matches
        })

    except Exception as e:
        return jsonify({'error': f'Error fetching matches: {str(e)}'}), 500

# ✅ Updated: /get-politician-values
@app.route('/get-politician-values', methods=['GET'])
def get_politician_values():
    try:
        language = request.args.get("language", "english")
        result = Politicians_Values(language=language)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': 'Error generating politician values: ' + str(e)}), 500

# ✅ Updated: /get-comparison-analysis
@app.route('/get-comparison-analysis', methods=['POST'])
def get_comparison_analysis():
    try:
        data = request.get_json()
        chat_id = data.get('chatId')
        language = data.get('language', 'english')

        if not chat_id:
            return jsonify({'error': 'chatId is required'}), 400

        record = db["predicted_user_values"].find_one({"chatId": chat_id})
        if not record:
            return jsonify({'error': 'No predicted values found for this chatId'}), 404

        predicted_obj = record.get("predicted_values", {})
        value_list = predicted_obj.get("values", [])

        predicted_values = [
            v["name"].strip()
            for v in value_list
            if isinstance(v, dict) and "name" in v and v.get("score", 0) >= 4
        ]

        print(f"✅ Parsed predicted values for analysis: {predicted_values} ({language})")

        gemini_result = generate_user_politician_comparison(predicted_values, language=language)
        enriched_result = enrich_with_candidate_data(gemini_result)

        return jsonify({
            'chatId': chat_id,
            'predicted_values': predicted_values,
            'analysis': enriched_result
        })

    except Exception as e:
        return jsonify({'error': f'Error generating analysis: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
