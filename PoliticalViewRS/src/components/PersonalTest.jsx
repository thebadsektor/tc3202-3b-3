// import React, { useState, useEffect } from "react";
// // import "./css/CardLayout.css";
// import Card from "./Card";
// import AgeSet from "./AgeSet";
// import GenderSet from "./GenderSet";
// import Result from "./Result";
// // import React from 'react';

// // function Card({ title, content, className, onClick }) {
// //   return (
// //     <div className={`card ${className}`} onClick={onClick}>
// //       <h2>{title}</h2>
// //       <p>{content}</p>
// //     </div>
// //   );
// // }

// // export default Card;

// //code ni Gabot------------------

// function PersonalTest() {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [showNextSet, setShowNextSet] = useState(false);
//   const [currentSet, setCurrentSet] = useState("");
//   const [showResult, setShowResult] = useState(false);
//   const [predictedValues, setPredictedValues] = useState("");

//   useEffect(() => {
//     const fetchStatements = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5000/get-statements`);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         console.log("Fetched Data:", data);

//         // Now parse the data correctly
//         const parsedQuestions = parseQuestionsAndOptions(data);
//         console.log("Parsed Questions:", parsedQuestions); // Check structure here

//         setQuestions(parsedQuestions);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching statements: " + error.message);
//         setLoading(false);
//       }
//     };

//     fetchStatements();
//   }, []);

//   const fetchPrediction = async (answers) => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/predict-values", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ answers }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch prediction");
//       }

//       const result = await response.json();
//       setPredictedValues(result.predicted_values);
//     } catch (error) {
//       setError("Error fetching prediction: " + error.message);
//     }
//   };

//   const parseQuestionsAndOptions = (data) => {
//     const parsed = [];
//     let currentQuestion = "";
//     let currentOptions = [];

//     // Loop through the data and build the questions and options array
//     for (let i = 0; i < data.length; i++) {
//       if (data[i].startsWith("Q:")) {
//         // If it's a question, push the previous question with its options if available
//         if (currentQuestion && currentOptions.length === 2) {
//           parsed.push({ question: currentQuestion, options: currentOptions });
//         }
//         currentQuestion = data[i]; // Set the new question
//         currentOptions = []; // Reset options
//       } else if (data[i].startsWith("O1:") || data[i].startsWith("O2:")) {
//         // If it's an option (either O1 or O2), push it to current options
//         currentOptions.push(data[i]);
//       }
//     }

//     // Push the last question and its options
//     if (currentQuestion && currentOptions.length === 2) {
//       parsed.push({ question: currentQuestion, options: currentOptions });
//     }

//     console.log("Parsed Questions:", parsed); // Log parsed data to check structure
//     return parsed;
//   };

//   const nextQuestion = (answer) => {
//     const newAnswers = [...userAnswers, answer];
//     setUserAnswers(newAnswers);

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       setShowAnswers(true);
//       setShowNextSet(true);
//       fetchPrediction(newAnswers);
//     }
//   };

//   const currentQuestion = questions[currentQuestionIndex] || {};
//   const { question, options } = currentQuestion;

//   // Define the handlers for age and gender selections
//   const onSelectAge = (age) => {
//     console.log(`Selected Age: ${age}`);
//     setCurrentSet("gender"); // Proceed to gender selection after age
//   };

//   const onSelectGender = (gender) => {
//     console.log(`Selected Gender: ${gender}`);
//     setShowResult(true); // Display the result after selecting gender
//   };

//   if (showResult) {
//     return (
//       <Result predictedValues={predictedValues} userAnswers={userAnswers} />
//     );
//   }

//   return (
//     <div className='min-h-screen bg-base-200 p-12 flex flex-col items-center justify-center text-white text-center'>
//       {loading && (
//         <div className='text-3xl font-medium text-primary'>Loading content</div>
//       )}
//       {error && <div className='error'>{error}</div>}

//       {!loading && !error && question && !showNextSet && currentSet === "" && (
//         <div className='question-container'>
//           <p className='question-text'>Q: {question}</p>
//           <div className='card-container'>
//             {options && options.length >= 2 ? (
//               <>
//                 <Card
//                   content={options[0]}
//                   className='card text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-150 hover:scale-115 hover:shadow-none group-hover:shadow-[0px_0px_20px_white] group-hover:blur-[1px] group-hover:hover:blur-none hover:text-black text-lg !rounded-3xl'
//                   onClick={() => nextQuestion(options[0])}
//                 />
//                 <Card
//                   content={options[1]}
//                   className='card text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-150 hover:scale-115 hover:shadow-none group-hover:shadow-[0px_0px_20px_white] group-hover:blur-[1px] group-hover:hover:blur-none hover:text-black text-lg !rounded-3xl'
//                   onClick={() => nextQuestion(options[1])}
//                 />
//               </>
//             ) : (
//               <p>Not enough options available</p> // If options aren't available or insufficient
//             )}
//           </div>
//         </div>
//       )}

//       {showAnswers && (
//         <div className='show-answers-container'>
//           <button
//             className='show-answers-button'
//             onClick={() =>
//               alert(`Your answers are: \n${userAnswers.join("\n")}`)
//             }
//           >
//             Show All Answers
//           </button>
//         </div>
//       )}

//       {showNextSet && currentSet === "" && (
//         <div className='next-set-container'>
//           <button
//             className='next-set-button'
//             onClick={() => setCurrentSet("age")}
//           >
//             Next Set
//           </button>
//         </div>
//       )}

//       {currentSet === "age" && <AgeSet onSelectAge={onSelectAge} />}
//       {currentSet === "gender" && <GenderSet onSelectGender={onSelectGender} />}
//     </div>
//   );
// }

// export default PersonalTest;

import React, { useState, useEffect } from "react";

// Card Component - Simplified and more consistent
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

// AgeSet Component - Improved with better accessibility
const AgeSet = ({ onSelectAge }) => {
  const ageOptions = ["18-24", "25-34", "35-44", "45-54", "55+"];

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

// GenderSet Component - Improved with better accessibility
const GenderSet = ({ onSelectGender }) => {
  const genderOptions = ["Male", "Female", "Other"];

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

// Result Component - More polished presentation
const Result = ({ predictedValues, userAnswers }) => {
  return (
    <div className='min-h-screen bg-[#212121] p-12 flex flex-col items-center justify-center text-white'>
      <h2 className='text-white mb-6'>Your Predicted Values</h2>
      <div className='bg-gray-800 bg-opacity-50 p-6 rounded-xl mb-8'>
        <p className='text-xl text-white'>
          Based on your responses, your predicted values are:
        </p>
        <p className='text-primary'>{predictedValues}</p>
      </div>

      <h3 className='text-xl font-semibold text-white mb-4'>Your Responses</h3>
      <ul className='space-y-0'>
        {userAnswers.map((answer, index) => (
          <li key={index} className='bg-gray-800 bg-opacity-30 p-4 rounded-lg'>
            <p className='text-white'>{answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main PersonalTest Component - Better organized and more robust
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

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/get-statements`);
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
    } catch (error) {
      setError("Error fetching prediction: " + error.message);
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
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-3xl font-medium text-white'>
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
      <Result predictedValues={predictedValues} userAnswers={userAnswers} />
    );
  }

  return (
    <div className='min-h-screen bg-base-200 p-12 flex flex-col items-center justify-center text-white text-center'>
      {!showNextSet && currentSet === "" && question && (
        <div className='w-full max-w-2xl mb-12'>
          <h2 className='text-3xl md:text-3xl font-medium text-white mb-12'>
            {question.replace("Q:", "").trim()}
          </h2>
          <div className='w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-10 group'>
            {options?.map((option, index) => (
              <Card
                key={index}
                content={option.replace(/^O\d+:/, "").trim()}
                className='card text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-150 hover:scale-115 hover:shadow-none group-hover:shadow-[0px_0px_20px_white] group-hover:blur-[1px] group-hover:hover:blur-none hover:text-black text-lg !rounded-3xl'
                onClick={() => handleAnswer(option)}
              />
            ))}
          </div>
        </div>
      )}

      {showNextSet && currentSet === "" && (
        <div className='flex flex-col items-center space-y-8'>
          <button
            className='card text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-200 hover:scale-110 hover:text-black mt-4 mb-4 py-4 px-6 text-lg rounded-lg border-1 border-white'
            onClick={() => setCurrentSet("age")}
          >
            Next Set
          </button>
          <button
            className='card text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-200 hover:scale-110 hover:text-black mt-4 mb-4 py-4 px-6 text-lg rounded-lg border-1 border-white'
            onClick={() => alert(`Your answers:\n${userAnswers.join("\n")}`)}
          >
            Review My Answers
          </button>
        </div>
      )}

      {currentSet === "age" && (
        <AgeSet onSelectAge={() => setCurrentSet("gender")} />
      )}
      {currentSet === "gender" && (
        <GenderSet onSelectGender={() => setShowResult(true)} />
      )}
    </div>
  );
};

export default PersonalTest;
