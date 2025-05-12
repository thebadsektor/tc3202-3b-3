import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidatesResult from "../components/CandidatesResult";

const Result = () => {
  const navigate = useNavigate();
  const chatId = localStorage.getItem("chatId");
  console.log("📥 Chat ID for fetching:", chatId);

  const [predictedValues, setPredictedValues] = useState({});
  const [userAnswers, setUserAnswers] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [fetchedAnalysis, setFetchedAnalysis] = useState(false);

  useEffect(() => {
    document.title = "Your Result";
  }, []);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        Math.abs(scrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
        setShowButton(direction === "up" || scrollY < 10);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  // ✅ Step 1: Get prediction and answers from MongoDB via chatId
  useEffect(() => {
    const fetchPrediction = async () => {
      const chatId = localStorage.getItem("chatId");
      console.log("📥 Chat ID for fetching:", chatId);

      if (!chatId) {
        console.warn("⚠️ No chatId found. Redirecting...");
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/get-predicted-values/${chatId}`
        );
        const data = await response.json();

        if (data.predicted_values && data.answers) {
          setPredictedValues(data.predicted_values);
          setUserAnswers(data.answers);
        } else {
          console.error("⚠️ Prediction not found. Redirecting...");
          navigate("/");
        }
      } catch (error) {
        console.error("❌ Error fetching prediction:", error);
        navigate("/");
      }
    };

    fetchPrediction();
  }, [navigate]);

  // ✅ Step 2: Once we have userAnswers, get politician analysis
  useEffect(() => {
    const fetchAnalysis = async () => {
      const chatId = localStorage.getItem("chatId");
      if (!chatId) return;

      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:5000/get-comparison-analysis",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Gemini analysis.");
        }

        const data = await response.json();
        console.log("👀 Analysis response from backend:", data.analysis);
        setAnalysis(data.analysis || []);

        if (data.analysis) {
          localStorage.setItem("analysisResult", JSON.stringify(data.analysis));
        }
        setFetchedAnalysis(true); // ✅ mark as done
      } catch (error) {
        console.error("❌ Error fetching Gemini analysis:", error);
        setAnalysis([]);
      } finally {
        setLoading(false);
      }
    };

    if (!chatId) {
      console.warn("⚠️ No chatId found. Redirecting to home...");
      navigate("/"); // or navigate to your test page
      return null; // stop rendering
    }

    if (
      Array.isArray(userAnswers) &&
      userAnswers.length > 0 &&
      !fetchedAnalysis
    ) {
      fetchAnalysis();
    }
  }, [userAnswers, fetchedAnalysis]); // ✅ include fetchedAnalysis dependency

  return (
    <main className="min-h-screen bg-[#212121] text-white p-8 flex flex-col items-center mt-25 space-y-12">
      {showButton && (
        <button
          onClick={() => navigate("/political-test")}
          className="fixed bottom-4 right-4 z-50 text-sm sm:text-base md:text-lg lg:text-xl bg-[#303030] hover:bg-yellow-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 md:py-4 md:px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <span className="text-lg sm:text-xl">←</span>
          <span className="text-xs xs:inline">Test Again</span>
        </button>
      )}

      {/* Predicted Values Section */}
      <section className="bg-[#303030] bg-opacity-50 p-6 rounded-xl w-full max-w-4xl ">
        <h2 className="text-xl font-semibold mb-8 text-center">
          Based on your responses, your predicted values are:
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full">
          {Array.isArray(predictedValues?.values) &&
            predictedValues.values.map((item, index) => {
              const { name, score, reason } = item;
              const percentage = (score / 5) * 100;

              const scoreDescriptions = {
                1: "Very low presence",
                2: "Low presence",
                3: "Moderate presence",
                4: "High presence",
                5: "Very strong presence",
              };

              return (
                <li key={index} className="flex flex-col space-y-2">
                  {/* Value name + tooltip */}
                  <div className="relative group font-semibold capitalize cursor-pointer w-fit">
                    {name}
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 px-3 py-2 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-normal w-64 z-20 text-center">
                      {reason}
                    </div>
                  </div>

                  {/* Progress Bar Row */}
                  <div className="flex items-center space-x-4">
                    <div className="relative h-1 bg-gray-700 rounded-full overflow-visible flex-1">
                      <div
                        className="h-full bg-yellow-400 transition-all duration-300 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />

                      {/* Circle + score tooltip */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-300 border-2 border-white rounded-full z-10 group"
                        style={{ left: `calc(${percentage}% - 8px)` }}
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                          {scoreDescriptions[score]}
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <span className="text-sm text-gray-300 w-10 text-right">
                      {score}/5
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      </section>

      {/* Politician Matching Section */}
      <section className="w-full bg-[#212121] px-4 py-6">
        <div className="w-full max-w-4xl bg-[#ebedff] rounded-md mx-auto flex flex-col space-y-6 px-4 sm:px-6 md:px-8">
          {loading ? (
            <div className="text-black text-base sm:text-lg text-center animate-pulse mt-4">
              Loading analysis...
            </div>
          ) : (
            <>
              <h1 className="text-xl sm:text-2xl font-semibold text-white text-center bg-[#8B0000] p-4 rounded-md">
                These politicians may share similar values or beliefs with you.
              </h1>

              <div className="p-4 sm:p-6 rounded-md space-y-6">
                {Array.isArray(analysis) && analysis.length > 0 ? (
                  analysis.map((candidate, index) => (
                    <div key={index} className="space-y-2">
                      <CandidatesResult
                        name={candidate.name}
                        party={candidate.party}
                        imageUrl={candidate.imageUrl}
                      />
                      <p className="bg-[#424242] text-white text-sm sm:text-md p-4 rounded-b-lg text-justify">
                        {candidate.reason}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-black text-center text-sm sm:text-base">
                    No aligned candidates found or analysis failed.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Result;
