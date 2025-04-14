from flask import Flask, jsonify, request
from flask_cors import CORS
from GeminiAPI.generatestatement import generate_content
from GeminiAPI.predict_values import predict_values_based_on_answers
from model.match_candidates import match_candidates
import os
from dotenv import load_dotenv

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Load environment variables
load_dotenv()

#this is for getting the statements
@app.route('/get-statements', methods=['GET'])
def get_statements():
    print("Regenerating questions")
    generated_content = generate_content()
    statements = generated_content.split('\n')
    cleaned_statements = [s.strip() for s in statements if s.strip()]
    return jsonify(cleaned_statements)

#this is for predicting the values of the user 
@app.route('/predict-values', methods=['POST'])
def predict_values():
    try:
        data = request.get_json()
        if not data or 'answers' not in data:
            return jsonify({'error': 'No answers provided'}), 400
            
        answers = data['answers']
        if not isinstance(answers, list):
            return jsonify({'error': 'Answers should be an array'}), 400
            
        predicted_values = predict_values_based_on_answers(answers)

        # Print predicted values to console
        print("Predicted values:", predicted_values)

        return jsonify({'predicted_values': predicted_values})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Endpoint for matching user values to candidate values
@app.route('/match-based-on-answers', methods=['POST'])
def match_based_on_answers():
    try:
        data = request.get_json()
        if not data or 'answers' not in data:
            return jsonify({'error': 'No answers provided'}), 400

        answers = data['answers']
        
        # Predict values from answers 
        raw_values_text = predict_values_based_on_answers(answers)

        # Convert text response to a list
        predicted_values = [
            line.replace("* ", "").strip()
            for line in raw_values_text.strip().splitlines()
            if line.startswith("*")
        ]

        if not predicted_values:
            return jsonify({'error': 'Could not extract predicted values'}), 500

        # Match candidates based on predicted values
        matched = match_candidates(predicted_values, csv_path="../../senator_candidates.csv")

        # Print predicted values and matches to console for debugging
        print("Predicted Values:")
        for val in predicted_values:
            print(f"  * {val}")
        
        print("\nMatched Candidates:")
        for candidate in matched:
            print(f"  - {candidate['candidate_name']} ({candidate['party']})")

        return jsonify({
            'predicted_values': predicted_values,
            'matches': matched
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

