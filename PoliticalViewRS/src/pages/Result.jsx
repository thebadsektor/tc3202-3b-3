import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CandidatesResult from "../components/CandidatesResult";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userAnswers, politicianAnswers, age, gender, chatId } =
    location.state || {};

  const [predictedValues, setPredictedValues] = useState({});
  const [userAnswersDB, setUserAnswersDB] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [fetchedAnalysis, setFetchedAnalysis] = useState(false);
  const [similarArticles, setSimilarArticles] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection]);

  // ✅ Step 1: Save prediction + fetch values
  useEffect(() => {
    const runPredictionFlow = async () => {
      console.log("📥 Chat ID for prediction:", chatId);
      if (!chatId) {
        console.warn("⚠️ No chatId found. Redirecting...");
        navigate("/");
        return;
      }

      try {
        // ✅ POST prediction to backend
        console.log("🚀 Sending answers to backend...");
        const postResponse = await fetch(
          `http://127.0.0.1:5000/predict-values/${chatId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              answers: userAnswers,
              politicianAnswers,
              age,
              gender,
            }),
          }
        );

        if (!postResponse.ok) {
          console.warn(
            `⚠️ POST prediction failed. Status: ${postResponse.status}`
          );
          return;
        }

        // ✅ GET prediction from backend
        console.log("📥 Fetching prediction from MongoDB...");
        const getResponse = await fetch(
          `http://127.0.0.1:5000/get-predicted-values/${chatId}`
        );
        if (!getResponse.ok) {
          console.warn(
            `⚠️ GET prediction failed. Status: ${getResponse.status}`
          );
          return;
        }

        const data = await getResponse.json();
        if (data.predicted_values && data.answers) {
          console.log("✅ Prediction data received:", data.predicted_values);
          setPredictedValues(data.predicted_values);
          setUserAnswersDB(data.answers);
        } else {
          console.warn("⚠️ No prediction data found. Redirecting...");
          navigate("/");
        }
      } catch (error) {
        console.error("❌ Error in prediction flow:", error);
        navigate("/");
      }
    };

    if (chatId) runPredictionFlow();
  }, [chatId, navigate, userAnswers, politicianAnswers, age, gender]);

  // ✅ Step 2: fetch matching analysis
  useEffect(() => {
    const fetchAnalysis = async () => {
      const chatId = location.state?.chatId;
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

        if (!response.ok) throw new Error("Failed to fetch analysis.");

        const data = await response.json();
        console.log("👀 Analysis data:", data.analysis);
        setAnalysis(data.analysis || []);
        if (data.analysis)
          localStorage.setItem("analysisResult", JSON.stringify(data.analysis));
        setFetchedAnalysis(true);
      } catch (error) {
        console.error("❌ Error fetching analysis:", error);
        setAnalysis([]);
      } finally {
        setLoading(false);
      }
    };

    if (chatId && userAnswersDB.length > 0 && !fetchedAnalysis) fetchAnalysis();
  }, [userAnswersDB, fetchedAnalysis, location.state]);

  useEffect(() => {
    const fetchSimilarArticles = async () => {
      if (!chatId) return;

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/get-matching-articles/${chatId}`
        );
        if (!response.ok) throw new Error("Failed to fetch articles.");
        const data = await response.json();
        console.log("📰 Articles data:", data);
        setSimilarArticles(data.articles || []);
      } catch (error) {
        console.error("❌ Error fetching articles:", error);
        setSimilarArticles([]);
      }
    };

    // safer trigger after analysis is fetched
    if (chatId && fetchedAnalysis) fetchSimilarArticles();
  }, [chatId, fetchedAnalysis]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
<<<<<<< HEAD
    <main className='min-h-screen bg-[#000] text-white flex flex-col '>
      {/* Scroll Progress Bar */}
      <div className='fixed top-0 left-0 w-full h-0.5 z-[9999] bg-transparent'>
        <div
          className='h-full transition-all duration-400 ease-out rgb-animate'
=======
    <main className="min-h-screen bg-[#000] text-white flex flex-col ">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 z-[9999] bg-transparent">
        <div
          className="h-full transition-all duration-400 ease-out rgb-animate"
>>>>>>> origin/main
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {showButton && (
        <button
          onClick={() => navigate("/political-test")}
          className='fixed bottom-4 right-4 z-50 text-sm sm:text-base md:text-lg lg:text-xl bg-[#303030] hover:bg-yellow-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 md:py-4 md:px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2'
        >
          <span className='text-lg sm:text-xl'>←</span>
          <span className='text-xs xs:inline'>Test Again</span>
        </button>
      )}

<<<<<<< HEAD
      <section className='bg-[#303030] min-h-screen font-mono flex flex-col pt-25 items-center text-white p-8 w-full'>
        <div className='w-full max-w-4xl space-y-8'>
          {/* Overall Summary */}
          {predictedValues?.overall_summary && (
            <div className='bg-[#212121] p-8 rounded-xl shadow-md'>
              <h2 className='text-xl font-mono text-white text-justify'>
=======
      <section className="bg-[#303030] min-h-screen font-mono flex flex-col pt-25 items-center text-white p-8 w-full">
        <div className="w-full max-w-4xl space-y-8">
          {/* Overall Summary */}
          {predictedValues?.overall_summary && (
            <div className="bg-[#212121] p-8 rounded-xl shadow-md">
              <h2 className="text-xl font-mono text-white text-justify">
>>>>>>> origin/main
                {predictedValues.overall_summary}
              </h2>
            </div>
          )}

          {/* Predicted Values */}
<<<<<<< HEAD
          <div className='bg-[#212121] bg-opacity-50 p-6 rounded-xl w-full max-w-4xl'>
            <h2 className='text-3xl font-mono pt-2 mb-12 text-center'>
=======
          <div className="bg-[#212121] bg-opacity-50 p-6 rounded-xl w-full max-w-4xl">
            <h2 className="text-3xl font-mono pt-2 mb-12 text-center">
>>>>>>> origin/main
              Based on your responses, your predicted values are:
            </h2>
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
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
                    <li
                      key={index}
<<<<<<< HEAD
                      className='flex flex-col text-white font-mono text-xl space-y-2'
                    >
                      {/* ✅ Hover ONLY on text */}
                      <span className='relative group capitalize cursor-pointer'>
                        {name}
                        <div className='absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-normal z-20 text-center'>
=======
                      className="flex flex-col text-white font-mono text-xl space-y-2"
                    >
                      {/* ✅ Hover ONLY on text */}
                      <span className="relative group capitalize cursor-pointer">
                        {name}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-normal z-20 text-center">
>>>>>>> origin/main
                          {reason}
                        </div>
                      </span>

<<<<<<< HEAD
                      <div className='flex items-center space-x-4'>
                        <div className='relative h-1 bg-cyan-900 rounded-full overflow-visible flex-1'>
                          <div
                            className='h-full bg-cyan-400 transition-all duration-300 rounded-full'
                            style={{ width: `${percentage}%` }}
                          />
                          <div
                            className='absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-300 border-2 border-white rounded-full z-10 group'
=======
                      <div className="flex items-center space-x-4">
                        <div className="relative h-1 bg-cyan-900 rounded-full overflow-visible flex-1">
                          <div
                            className="h-full bg-cyan-400 transition-all duration-300 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-300 border-2 border-white rounded-full z-10 group"
>>>>>>> origin/main
                            style={{ left: `calc(${percentage}% - 8px)` }}
                          >
                            <div className='absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20'>
                              {scoreDescriptions[score]}
                            </div>
                          </div>
                        </div>
<<<<<<< HEAD
                        <span className='text-md p-1 text-white font-bold w-10 text-right'>
=======
                        <span className="text-md p-1 text-white font-bold w-10 text-right">
>>>>>>> origin/main
                          {score}/5
                        </span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          {/* Down arrow link */}
          <div
<<<<<<< HEAD
            className='flex items-center justify-center h-full flex-col items-center cursor-pointer mt-8'
=======
            className="flex items-center justify-center h-full flex-col items-center cursor-pointer mt-8"
>>>>>>> origin/main
            onClick={() =>
              document
                .getElementById("recommendations-section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
<<<<<<< HEAD
            <span className='animate-bounce text-7xl text-white'>🡇</span>
            <span className='text-3xl items-center font-mono text-white'>
=======
            <span className="animate-bounce text-7xl text-white">🡇</span>
            <span className="text-3xl items-center font-mono text-white">
>>>>>>> origin/main
              See similar politicians and articles
            </span>
          </div>
        </div>
      </section>

      {/* Matching Politicians */}
<<<<<<< HEAD
      <section className='w-full bg-black'>
        <div className='w-full max-w-4xl bg-black pb-20 rounded-md mx-auto flex flex-col space-y-6 px-4 sm:px-6 md:px-8'>
          {loading ? (
            <div className='text-white text-5xl pt-20 pb-20 font-bold text-center animate-pulse mt-4'>
=======
      <section className="w-full bg-black">
        <div className="w-full max-w-4xl bg-black pb-20 rounded-md mx-auto flex flex-col space-y-6 px-4 sm:px-6 md:px-8">
          {loading ? (
            <div className="text-white text-5xl pt-20 pb-20 font-bold text-center animate-pulse mt-4">
>>>>>>> origin/main
              Loading Analysis
            </div>
          ) : (
            <>
<<<<<<< HEAD
              <h1 className='text-4xl font-mono font-bold mt-10 mb-10 text-white text-center'>
                These politicians may share similar values or beliefs with you
              </h1>

              <div className='rounded-md space-y-6'>
=======
              <h1 className="text-4xl font-mono font-bold mt-10 mb-10 text-white text-center">
                These politicians may share similar values or beliefs with you
              </h1>

              <div className="rounded-md space-y-6">
>>>>>>> origin/main
                {Array.isArray(analysis) && analysis.length > 0 ? (
                  analysis.map((candidate, index) => (
                    <div key={index} className='space-y-2'>
                      <CandidatesResult
                        name={candidate.name}
                        party={candidate.party}
                        imageUrl={candidate.imageUrl}
                      />
<<<<<<< HEAD
                      <p className='bg-[#303030] text-lg text-white p-6 rounded-b-lg text-justify'>
=======
                      <p className="bg-[#303030] text-lg text-white p-6 rounded-b-lg text-justify">
>>>>>>> origin/main
                        {candidate.reason}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className='text-black text-center text-sm sm:text-base'>
                    No aligned candidates found or analysis failed.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Similar Articles Section */}
      {similarArticles.length > 0 && (
<<<<<<< HEAD
        <section className='w-full bg-[#212121] px-4 py-6'>
          <div className='w-full max-w-4xl bg-[#1F1F1F] rounded-md mx-auto flex flex-col space-y-2'>
            <h1 className='text-5xl font-mono font-bold mt-20 text-white text-center'>
=======
        <section className="w-full bg-[#212121] px-4 py-6">
          <div className="w-full max-w-4xl bg-[#1F1F1F] rounded-md mx-auto flex flex-col space-y-2">
            <h1 className="text-5xl font-mono font-bold mt-20 text-white text-center">
>>>>>>> origin/main
              Related News Articles
            </h1>
            <div className='p-4 sm:p-6 space-y-6'>
              {similarArticles.map((article, index) => (
                <div
                  key={index}
<<<<<<< HEAD
                  className='bg-[#2E2E2E] p-6 rounded-lg shadow-md space-y-2'
                >
                  <h3 className='text-2xl font-mono font-bold text-white'>
                    {article.article_title}
                  </h3>
                  <p className='text-white italic text-lg text-justify'>
=======
                  className="bg-[#2E2E2E] p-6 rounded-lg shadow-md space-y-2"
                >
                  <h3 className="text-2xl font-mono font-bold text-white">
                    {article.article_title}
                  </h3>
                  <p className="text-white italic text-lg text-justify">
>>>>>>> origin/main
                    {article.article_text}
                  </p>
                  <a
                    href={article.source_url}
<<<<<<< HEAD
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-block mt-2 text-xl font-mono text-cyan-300'
=======
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xl font-mono text-cyan-300"
>>>>>>> origin/main
                  >
                    Read full article →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Top Button */}
      {!loading && (
<<<<<<< HEAD
        <section className='bg-[#212121] text-white flex justify-center pb-15 pt-10 items-center'>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className='text-white text-2xl animate-bounce font-mono font-bold cursor-pointer hover:text-cyan-400'
=======
        <section className="bg-[#212121] text-white flex justify-center pb-15 pt-10 items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-white text-2xl animate-bounce font-mono font-bold cursor-pointer hover:text-cyan-400"
>>>>>>> origin/main
          >
            🡅 Back to Top
          </button>
        </section>
      )}
    </main>
  );
};

export default Result;
