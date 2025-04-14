import React, { useState, useEffect } from "react";
import Result from "./Result";
import bgImage from "../assets/Background.png";

// Card Component
const Card = ({ content, className = "", onClick }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg bg-white bg-opacity-20 backdrop-blur-sm border border-gray-200 border-opacity-30 hover:bg-opacity-100 text-white ${className}`}
      onClick={onClick}
    >
      <p className='text-lg font-medium'>{content}</p>
    </div>
  );
};

// AgeSet Component
const AgeSet = ({ onSelectAge }) => {
  const ageOptions = ["18-24", "25-34", "35-44", "45-54", "55+"];

  useEffect(() => {
    document.title = "Select Age";
  }, []);

  return (
    <div className='flex flex-col items-center space-y-8'>
      <p className='text-2xl font-medium text-white mb-4'>Age Group</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-2xl'>
        {ageOptions.map((option) => (
          <Card
            key={option}
            content={option}
            className='card text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-200 hover:scale-110 hover:text-black mt-4 mb-4 py-4 px-6 text-lg rounded-lg border-1 border-white'
            onClick={() => onSelectAge(option)}
          />
        ))}
      </div>
    </div>
  );
};

// GenderSet Component
const GenderSet = ({ onSelectGender }) => {
  const genderOptions = ["Male", "Female", "Other"];

  useEffect(() => {
    document.title = "Select Gender";
  }, []);

  return (
    <div className='flex flex-col items-center space-y-8'>
      <p className='text-2xl font-medium text-white mb-4'>Gender</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {genderOptions.map((option) => (
          <Card
            key={option}
            content={option}
            className='card text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-200 hover:scale-110 hover:text-black mt-4 mb-4 py-4 px-6 text-lg rounded-lg border-1 border-white'
            onClick={() => onSelectGender(option)}
          />
        ))}
      </div>
    </div>
  );
};

// Main Component
const PersonalTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showNextSet, setShowNextSet] = useState(false);
  const [currentSet, setCurrentSet] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [predictedValues, setPredictedValues] = useState("");
  const [matchedCandidates, setMatchedCandidates] = useState([]);
  const [politicianStatements, setPoliticianStatements] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [politicianAnswers, setPoliticianAnswers] = useState([]);
  const [loadingPoliticianStatements, setLoadingPoliticianStatements] = useState(false);

  useEffect(() => {
    const fetchStatements = async () => {
      document.title = "Personality Test";

      try {
        const response = await fetch("http://127.0.0.1:5000/get-statements");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setQuestions(parseQuestionsAndOptions(data));
      } catch (error) {
        setError("Error fetching statements: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatements();
  }, []);

  const parseQuestionsAndOptions = (data) => {
    return data.reduce((acc, item) => {
      if (item.startsWith("Q:")) {
        acc.push({ question: item, options: [] });
      } else if (item.startsWith("O1:") || item.startsWith("O2:")) {
        if (acc.length > 0) {
          acc[acc.length - 1].options.push(item);
        }
      }
      return acc;
    }, []);
  };

  const fetchMatchingCandidates = async (answers) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/match-based-on-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) throw new Error("Failed to fetch matched candidates");

      const result = await response.json();
      return result.matches || [];
    } catch (error) {
      console.error("Error fetching matched candidates:", error);
      return [];
    }
  };

  const fetchPrediction = async (answers) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict-values", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) throw new Error("Failed to fetch prediction");

      const result = await response.json();
      setPredictedValues(result.predicted_values);

      const matches = await fetchMatchingCandidates(answers);
      setMatchedCandidates(matches);
    } catch (error) {
      setError("Error fetching prediction or matches: " + error.message);
    }
  };

  const fetchPoliticianStatements = async () => {
    try {
      setLoadingPoliticianStatements(true);
      const response = await fetch("http://127.0.0.1:5000/get-politician-statements");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setPoliticianStatements(data);
    } catch (error) {
      setError("Error fetching political statements: " + error.message);
    } finally {
      setLoadingPoliticianStatements(false);
    }
  };

  const handlePoliticianAnswer = (selectedIndex) => {
    const selectedStatement = politicianStatements[selectedIndex];
    setPoliticianAnswers([...politicianAnswers, selectedStatement]);

    if (currentRound + 2 < politicianStatements.length) {
      setCurrentRound(currentRound + 2);
    } else {
      setCurrentSet("age"); // Change to age after politicians
    }
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowNextSet(true);
      fetchPrediction(newAnswers);
    }
  };

  const currentQuestion = questions[currentQuestionIndex] || {};
  const { question, options } = currentQuestion;

  if (loading) {
    return (
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className='fixed top-0 left-0 w-full h-full bg-cover bg-center flex items-center justify-center text-white text-center z-50'
      >
        <div className='text-3xl font-medium text-white animate-pulse'>
          Loading content...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-xl text-red-500'>{error}</div>
      </div>
    );
  }

  if (showResult) {
    return (
      <Result
        predictedValues={predictedValues}
        userAnswers={userAnswers}
        matchedCandidates={matchedCandidates}
      />
    );
  }

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="min-h-screen bg-cover bg-center p-12 flex flex-col items-center justify-center text-white text-center"
    >
      {/* Q&A */}
      {!showNextSet && currentSet === "" && question && (
        <div className="w-full max-w-2xl mb-12">
          <h2 className="text-3xl md:text-3xl font-medium text-white mb-12">
            {question.replace("Q:", "").trim()}
          </h2>
          <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-10 group">
            {options?.map((option, index) => (
              <Card
                key={index}
                content={option.replace(/^O\d+:/, "").trim()}
                className="card text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-150 hover:scale-115 hover:shadow-none group-hover:shadow-[0px_0px_20px_white] group-hover:blur-[1px] group-hover:hover:blur-none hover:text-black text-lg !rounded-3xl"
                onClick={() => handleAnswer(option)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Move to Political Statements next */}
      {showNextSet && currentSet === "" && (
        <div className="flex flex-col items-center space-y-8">
          <button
            className="card text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-200 hover:scale-110 hover:text-black mt-4 mb-4 py-4 px-6 text-lg rounded-lg border-1 border-white"
            onClick={() => {
              setCurrentSet("politics");
              fetchPoliticianStatements();
            }}
          >
            Next Set
          </button>
        </div>
      )}

      {/* Politician Statements */}
      {currentSet === "politics" && currentRound < politicianStatements.length && (
        <div className="w-full max-w-5xl flex flex-col items-center space-y-8">
          {loadingPoliticianStatements ? (
            <div className="text-2xl text-white font-medium animate-pulse mt-12">
              Loading Content...
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-medium text-white mb-4">
                Pick the statement you agree with more:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {[0, 1].map((offset) => {
                  const index = currentRound + offset;
                  if (index >= politicianStatements.length) return null;

                  const cleanStatement = politicianStatements[index].replace(/^\d+\.\s*/, "");

                  return (
                    <Card
                      key={index}
                      content={cleanStatement}
                      className="card text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-150 hover:scale-115 hover:text-black text-lg !rounded-3xl"
                      onClick={() => handlePoliticianAnswer(index)}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* Age Selection */}
      {currentSet === "age" && (
        <AgeSet onSelectAge={() => setCurrentSet("gender")} />
      )}

      {/* Gender Selection */}
      {currentSet === "gender" && (
        <GenderSet onSelectGender={() => setShowResult(true)} />
      )}
    </div>
  );
};

export default PersonalTest;
