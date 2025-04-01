from flask import Flask, jsonify, request
from flask_cors import CORS
from generatestatement import generate_content  # Only import the necessary function
from predict_values import predict_values_based_on_answers
import json
import time

# Initialize Flask app
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS)
CORS(app)

# Endpoint to get statements (questions) from the generatestatement.py
@app.route('/get-statements', methods=['GET'])
def get_statements():
    print("Regenerating questions")  # Log message to indicate regeneration

    # Directly regenerate content each time
    generated_content = generate_content()

    # Split into lines and clean the statements
    statements = generated_content.split('\n')
    cleaned_statements = []

    for statement in statements:
        cleaned_statement = statement.strip()
        if cleaned_statement:
            cleaned_statements.append(cleaned_statement)

    # Return the fresh set of statements as JSON
    return jsonify(cleaned_statements)

# Endpoint to predict the values based on user answers (from predict_values.py)
@app.route('/predict-values', methods=['POST'])
def predict_values():
    try:
        data = request.json  # Get user answers as JSON
        answers = data.get('answers', [])

        # Call the function from predict_values.py to predict values based on the answers
        predicted_values = predict_values_based_on_answers(answers)

        # Return the predicted values
        return jsonify({'predicted_values': predicted_values})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run the Flask server on port 5000
