import React, { useEffect } from "react";

const Result = ({ predictedValues, matchedCandidates }) => {
  const valuesOnly = Array.isArray(predictedValues)
    ? predictedValues
    : predictedValues
        .replace(/Based on your responses, your predicted values are:/i, "")
        .split("*")
        .map((val) => val.trim())
        .filter((val) => val.length > 0);

        useEffect(() => {
            document.title = "Result";
          }, []);

          return (
            <div className='min-h-screen bg-[#212121] p-12 flex items-center justify-center text-white'>
              <div className='flex flex-col lg:flex-row gap-8 w-full max-w-6xl justify-center'>
          
                {/* Predicted Values */}
                <div className='bg-gray-800 bg-opacity-50 p-6 rounded-xl w-fit max-w-full'>
                  <p className='text-xl text-white mb-2'>
                    Based on your responses,<br/> your predicted values are:
                  </p>
                  <br />
                  <ul className='list-disc list-inside space-y-2'>
                    {valuesOnly.map((value, index) => (
                      <li key={index} className='text-white text-lg break-words'>
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
          
                {/* Matched Candidates */}
                <div className='bg-gray-800 bg-opacity-50 p-6 rounded-xl w-fit max-w-full'>
                  <p className='text-xl text-white mb-2'>Top Matching Candidates:</p>
                  <br /> <br />
                  <ul className='space-y-2'>
                    {matchedCandidates.map((candidate, index) => (
                      <li key={index} className='text-white text-lg break-words'>
                        • {candidate.candidate_name} ({candidate.party})
                      </li>
                    ))}
                  </ul>
                </div>
          
              </div>
            </div>
          );
          
};

export default Result;
