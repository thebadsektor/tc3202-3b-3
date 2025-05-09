import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CandidatesResult from "../components/CandidatesResult";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { predictedValues, userAnswers } = location.state || {};

  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ensure navigation state is valid
  useEffect(() => {
    if (
      !predictedValues ||
      !userAnswers ||
      !Array.isArray(userAnswers) ||
      userAnswers.length === 0
    ) {
      console.warn("🚫 Missing prediction or answers, redirecting...");
      navigate("/result");
    }
  }, [predictedValues, userAnswers, navigate]);

  const valuesOnly = Array.isArray(predictedValues)
    ? predictedValues
    : predictedValues
        ?.replace(/Based on your responses, your predicted values are:/i, "")
        .split("*")
        .map((val) => val.trim())
        .filter((val) => val.length > 0) || [];

  // Fetch analysis only once when answers are fully loaded
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:5000/get-comparison-analysis",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: userAnswers }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Gemini analysis.");
        }

        const data = await response.json();
        console.log("👀 Analysis response from backend:", data.analysis);
        setAnalysis(data.analysis || []);

        // ✅ Store result in localStorage
        // Optional: store in localStorage
        if (data.analysis) {
          localStorage.setItem("analysisResult", JSON.stringify(data.analysis));
        }
      } catch (error) {
        console.error("❌ Error fetching Gemini analysis:", error);
        setAnalysis([]);
      } finally {
        setLoading(false);
      }
    };

    if (Array.isArray(userAnswers) && userAnswers.length > 0) {
      fetchAnalysis();
    }
  }, [userAnswers]);

  return (
    <main className="min-h-screen bg-[#212121] text-white p-8 flex flex-col items-center mt-25 space-y-12">
      {/* ✅ Section 1: Predicted Values */}
      {/* Predicted Values Section */}
      <section className="bg-[#303030] bg-opacity-50 p-6 rounded-xl w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">
          Based on your responses, your predicted values are:
        </h2>
        <ul className="list-disc list-inside space-y-2">
          {valuesOnly.map((value, index) => (
            <li key={index} className="text-white text-lg break-words">
              {value}
            </li>
          ))}
        </ul>
      </section>

      {/* ✅ Section 2: Gemini AI Politician Matching - Fullscreen & Scrollable */}
      {/* Gemini Analysis Results */}
      <section className="w-full h-screen bg-[#212121] px-4 py-6 overflow-y-auto">
        <div className="w-full max-w-4xl bg-[#ebedff] rounded-md mx-auto flex flex-col space-y-6">
          {loading ? (
            <div className="text-black text-lg text-center animate-pulse mt-4">
              Loading analysis...
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-white text-center bg-[#8B0000] p-4 rounded-md mb-0">
                These politicians may share similar values or beliefs with you.
              </h1>

              <div className="p-6 rounded-md space-y-6 mt-0">
                {Array.isArray(analysis) && analysis.length > 0 ? (
                  analysis.map((candidate, index) => (
                    <div key={index}>
                      <CandidatesResult
                        name={candidate.name}
                        party={candidate.party}
                        imageUrl={candidate.imageUrl}
                      />
                      <p className="bg-[#424242] text-white text-md p-4 rounded-b-lg text-justify">
                        {candidate.reason}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-black text-center">
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

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import CandidatesResult from "../components/CandidatesResult";

// const Result = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { predictedValues, userAnswers } = location.state || {};

//   const [analysis, setAnalysis] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!predictedValues || !userAnswers) {
//       navigate("/result");
//     }
//   }, [predictedValues, userAnswers, navigate]);

//   const valuesOnly = Array.isArray(predictedValues)
//     ? predictedValues
//     : predictedValues
//         ?.replace(/Based on your responses, your predicted values are:/i, "")
//         .split("*")
//         .map((val) => val.trim())
//         .filter((val) => val.length > 0) || [];

//   useEffect(() => {
//     document.title = "Result";

//     const fetchAnalysis = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "http://127.0.0.1:5000/get-comparison-analysis",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ answers: userAnswers }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch Gemini analysis.");
//         }

//         const data = await response.json();
//         setAnalysis(data.analysis || []);

//         // ✅ Store result in localStorage
//         if (data.analysis) {
//           localStorage.setItem("analysisResult", JSON.stringify(data.analysis));
//         }
//       } catch (error) {
//         console.error("Error fetching Gemini analysis:", error);
//         setAnalysis([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userAnswers) {
//       fetchAnalysis();
//     }
//   }, [userAnswers]);

//   return (
//     <main className="min-h-screen bg-[#212121] text-white p-8 flex flex-col items-center mt-25 space-y-12">
//       {/* ✅ Section 1: Predicted Values */}
//       <section className="bg-[#303030] bg-opacity-50 p-6 rounded-xl w-full max-w-4xl">
//         <h2 className="text-xl font-semibold mb-4">
//           Based on your responses, your predicted values are:
//         </h2>
//         <ul className="list-disc list-inside space-y-2">
//           {valuesOnly.map((value, index) => (
//             <li key={index} className="text-white text-lg break-words">
//               {value}
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* ✅ Section 2: Gemini AI Politician Matching - Fullscreen & Scrollable */}
//       <section className="w-full h-screen bg-[#212121] px-4 py-6 overflow-y-auto">
//         <div className="w-full max-w-4xl bg-[#ebedff] mx-auto flex flex-col space-y-6">
//           {loading ? (
//             <div className="text-black text-lg text-center animate-pulse mt-4">
//               Loading analysis...
//             </div>
//           ) : (
//             <>
//               <h1 className="text-2xl font-semibold text-white text-center bg-[#8B0000] p-4 rounded-md mb-0">
//                 These politicians may share similar values or beliefs with you.
//               </h1>

//               <div className="p-6 rounded-md space-y-6 mt-0">
//                 {Array.isArray(analysis) && analysis.length > 0 ? (
//                   analysis.map((candidate, index) => (
//                     <div key={index}>
//                       <CandidatesResult
//                         name={candidate.name}
//                         party={candidate.party}
//                         imageUrl={candidate.imageUrl}
//                       />
//                       <p className="bg-[#424242] text-white text-md p-4 rounded-b-lg text-justify">
//                         {candidate.reason}
//                       </p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-black text-center">
//                     No aligned candidates found or analysis failed.
//                   </p>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Result;
