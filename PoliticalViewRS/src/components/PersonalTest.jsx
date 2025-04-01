import React, { useState, useEffect } from 'react';
import './css/CardLayout.css';
import Card from './Card'; 
import AgeSet from './AgeSet';  
import GenderSet from './GenderSet'; 
import Result from './Result';

function PersonalTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showNextSet, setShowNextSet] = useState(false);
  const [currentSet, setCurrentSet] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [predictedValues, setPredictedValues] = useState("");

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/get-statements`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched Data:', data);
    
        // Now parse the data correctly
        const parsedQuestions = parseQuestionsAndOptions(data);
        console.log('Parsed Questions:', parsedQuestions);  // Check structure here
        
        setQuestions(parsedQuestions);
        setLoading(false);
      } catch (error) {
        setError('Error fetching statements: ' + error.message);
        setLoading(false);
      }
    };      
    
    fetchStatements();
  }, []);

  const fetchPrediction = async (answers) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict-values', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const result = await response.json();
      setPredictedValues(result.predicted_values);
    } catch (error) {
      setError('Error fetching prediction: ' + error.message);
    }
  };

  const parseQuestionsAndOptions = (data) => {
    const parsed = [];
    let currentQuestion = "";
    let currentOptions = [];
  
    // Loop through the data and build the questions and options array
    for (let i = 0; i < data.length; i++) {
      if (data[i].startsWith('Q:')) {
        // If it's a question, push the previous question with its options if available
        if (currentQuestion && currentOptions.length === 2) {
          parsed.push({ question: currentQuestion, options: currentOptions });
        }
        currentQuestion = data[i];  // Set the new question
        currentOptions = [];  // Reset options
      } else if (data[i].startsWith('O1:') || data[i].startsWith('O2:')) {
        // If it's an option (either O1 or O2), push it to current options
        currentOptions.push(data[i]);
      }
    }
  
    // Push the last question and its options
    if (currentQuestion && currentOptions.length === 2) {
      parsed.push({ question: currentQuestion, options: currentOptions });
    }
  
    console.log('Parsed Questions:', parsed);  // Log parsed data to check structure
    return parsed;
  };

  const nextQuestion = (answer) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowAnswers(true);
      setShowNextSet(true);
      fetchPrediction(newAnswers);
    }
  };

  const currentQuestion = questions[currentQuestionIndex] || {};
  const { question, options } = currentQuestion;

  // Define the handlers for age and gender selections
  const onSelectAge = (age) => {
    console.log(`Selected Age: ${age}`);
    setCurrentSet('gender');  // Proceed to gender selection after age
  };

  const onSelectGender = (gender) => {
    console.log(`Selected Gender: ${gender}`);
    setShowResult(true);  // Display the result after selecting gender
  };

  if (showResult) {
    return <Result predictedValues={predictedValues} userAnswers={userAnswers} />;
  }

  return (
    <div className="card-layout-container">
      {loading && <div className="loading">Loading content...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && question && !showNextSet && currentSet === '' && (
        <div className="question-container">
          <p className="question-text">Q: {question}</p>
          <div className="card-container">
            {options && options.length >= 2 ? (
              <>
                <Card
                  title=""
                  content={options[0]}  // Option 1
                  className="card-first"
                  onClick={() => nextQuestion(options[0])}
                />
                <Card
                  title=""
                  content={options[1]}  // Option 2
                  className="card-second"
                  onClick={() => nextQuestion(options[1])}
                />
              </>
            ) : (
              <p>Not enough options available</p>  // If options aren't available or insufficient
            )}
          </div>
        </div>
      )}

      {showAnswers && (
        <div className="show-answers-container">
          <button
            className="show-answers-button"
            onClick={() => alert(`Your answers are: \n${userAnswers.join("\n")}`)}
          >
            Show All Answers
          </button>
        </div>
      )}

      {showNextSet && currentSet === '' && (
        <div className="next-set-container">
          <button
            className="next-set-button"
            onClick={() => setCurrentSet('age')}
          >
            Next Set
          </button>
        </div>
      )}

      {currentSet === 'age' && <AgeSet onSelectAge={onSelectAge} />}
      {currentSet === 'gender' && <GenderSet onSelectGender={onSelectGender} />}
    </div>
  );
}

export default PersonalTest;
