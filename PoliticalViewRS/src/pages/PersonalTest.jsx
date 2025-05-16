import React, { useState, useEffect } from "react";
import Result from "./Result";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { AgeSet, GenderSet } from "../components/AgeGenderSet";
import { v4 as uuidv4 } from "uuid";
import InstructionsModal from "../components/HowToUse";

const PersonalTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showNextSet, setShowNextSet] = useState(false);
  const [currentSet, setCurrentSet] = useState("");
  const [politicianStatements, setPoliticianStatements] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [politicianAnswers, setPoliticianAnswers] = useState([]);
  const [loadingPoliticianStatements, setLoadingPoliticianStatements] =
    useState(false);
  const [ageAnswer, setAgeAnswer] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatements = async () => {
      document.title = "Test";
      try {
        setLoading(true);
        const language = localStorage.getItem("selectedLanguage") || "english";
        const response = await fetch(
          `http://127.0.0.1:5000/get-statements?language=${language}`
        );
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
      if (item.startsWith("Q:")) acc.push({ question: item, options: [] });
      else if (item.startsWith("O1:") || item.startsWith("O2:"))
        acc[acc.length - 1]?.options.push(item);
      return acc;
    }, []);
  };

  const fetchPoliticianStatements = async () => {
    try {
      setLoadingPoliticianStatements(true);
      const language = localStorage.getItem("selectedLanguage") || "english";
      const response = await fetch(
        `http://127.0.0.1:5000/get-politician-statements?language=${language}`
      );
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

    const nextRound = currentRound + 1;
    const nextIndex = nextRound * 3;

    if (nextIndex < politicianStatements.length) {
      setCurrentRound(nextRound);
    } else {
      setCurrentSet("age");
    }
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);
    if (currentQuestionIndex < questions.length - 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    else setShowNextSet(true);
  };

  const formatTopic = (text) => {
    if (!text) return "";
    return text
      .replace(/^Topic\s*:\s*\[statements about\]\s*/i, "")
      .replace(/^\[|\]$/, "")

      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const currentQuestion = questions[currentQuestionIndex] || {};
  const { question, options } = currentQuestion;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );

  // if (loading) {
  //   return (
  //     <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center flex items-center justify-center text-white text-center z-50">
  //       <div className="text-3xl font-medium text-white animate-pulse">
  //         Loading statements...
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen p-12 flex flex-col items-center justify-center text-white text-center">
      <img
        src="https://imgs.search.brave.com/6sMQQ2FkmGLl_pIOG0uF_lS_H6iK-eOoLZXxpd5jkXU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by93YXZpbmctc2ls/ay1mbGFnLXBoaWxp/cHBpbmVzXzk3ODg2/LTQxNjIuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MA"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover blur-md"
      />
      <div className="absolute inset-0 bg-black/85"></div>

      {/*Help button top-left */}
      <button
        onClick={() => setShowInstructions(true)}
        className="fixed top-8 right-8 z-50  text-[#fff] text-4xl font-semibold sm:text-sm hover:underline hover:text-[#F5F5DC] transition"
      >
        How to take the test?
      </button>

      {/*Modal */}
      <InstructionsModal
        show={showInstructions}
        onClose={() => setShowInstructions(false)}
      />

      <div className="relative z-10">
        {!showNextSet &&
          currentSet === "" &&
          (loading ? (
            <div className="w-full flex items-center justify-center">
              <div className="text-2xl font-semibold text-white animate-pulse">
                Loading contents...
              </div>
            </div>
          ) : (
            question && (
              <div className="w-full max-w-2xl mb-12">
                <h5 className="text-lg md:text-2xl font-semibold text-white mb-6 text-justify">
                  {question.replace("Q:", "").trim()}
                </h5>
                <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-10 group">
                  {options?.map((option, index) => (
                    <Card
                      key={index}
                      content={option.replace(/^O\d+:/, "").trim()}
                      className="card text-white bg-[#003366] hover:!bg-[#F5F5DC] transform transition-transform duration-150 hover:scale-105 hover:text-black text-base md:text-lg !rounded-3xl"
                      onClick={() => handleAnswer(option)}
                    />
                  ))}
                </div>
              </div>
            )
          ))}

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

        {currentSet === "politics" && loadingPoliticianStatements && (
          <div className="text-3xl font-medium text-white animate-pulse mt-12">
            Loading statements...
          </div>
        )}
        {currentSet === "politics" &&
          !loadingPoliticianStatements &&
          currentRound * 3 < politicianStatements.length && (
            <div className="w-full max-w-5xl flex flex-col items-center space-y-8">
              <h5 className="text-lg md:text-2xl font-semibold text-white mb-6 text-justify max-w-[600px]">
                {formatTopic(politicianStatements[currentRound * 3])}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center w-full max-w-2xl mx-auto">
                {[0, 1].map((offset) => {
                  const index = currentRound * 3 + offset + 1;
                  if (index >= politicianStatements.length) return null;
                  const cleanStatement = politicianStatements[index]
                    .replace(/^O[12]:\s*/, "")
                    .trim();
                  return (
                    <Card
                      key={index}
                      content={cleanStatement}
                      className="card text-white bg-[#003366] hover:!bg-[#F5F5DC] transform transition-transform duration-150 hover:scale-105 hover:text-black text-base md:text-lg !rounded-3xl"
                      onClick={() => handlePoliticianAnswer(index)}
                    />
                  );
                })}
              </div>
            </div>
          )}

        {currentSet === "age" && (
          <AgeSet
            onSelectAge={(age) => {
              setAgeAnswer(age);
              setCurrentSet("gender"); // ✅ switch to gender page
            }}
          />
        )}
        {currentSet === "gender" && (
          <GenderSet
            onSelectGender={(gender) => {
              const chatId = uuidv4();
              navigate("/result", {
                state: {
                  userAnswers,
                  politicianAnswers,
                  age: ageAnswer,
                  gender,
                  chatId,
                },
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalTest;
