import React from "react";

const Result = ({ predictedValues, matchedCandidates }) => {
  const valuesOnly = Array.isArray(predictedValues)
    ? predictedValues
    : predictedValues
        .replace(/Based on your responses, your predicted values are:/i, "")
        .split("*")
        .map((val) => val.trim())
        .filter((val) => val.length > 0);

  return (
    <div className='min-h-screen bg-[#212121] p-12 flex flex-col items-center justify-center text-white'>
      <div className='bg-gray-800 bg-opacity-50 p-6 rounded-xl mb-8'>
        <p className='text-xl text-white mb-2'>
          Based on your responses, your predicted values are:
        </p>
        <ul className='list-disc list-inside space-y-2'>
          {valuesOnly.map((value, index) => (
            <li key={index} className='text-white text-lg'>
              {value}
            </li>
          ))}
        </ul>
      </div>

      <div className='bg-gray-800 bg-opacity-50 p-6 rounded-xl'>
        <p className='text-xl text-white mb-2'>
          Top Matching Candidates:
        </p>
        <ul className='space-y-2'>
          {matchedCandidates.map((candidate, index) => (
            <li key={index} className='text-white text-lg'>
              • {candidate.candidate_name} ({candidate.party})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Result;
