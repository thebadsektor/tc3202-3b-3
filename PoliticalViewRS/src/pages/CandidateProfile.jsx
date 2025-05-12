import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Papa from "papaparse";

const CandidateProfilePage = () => {
  const { slug } = useParams();
  const [candidate, setCandidate] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageTitle = queryParams.get("name");
  const [showFullBackground, setShowFullBackground] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return ""; // handle invalid date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (pageTitle) {
      document.title = pageTitle;
    }
  }, [pageTitle]);
  useEffect(() => {
    Papa.parse("/candidates.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const data = results.data;
        const found = data.find((row) => {
          const rowSlug = row.nickname?.toLowerCase().replace(/\s+/g, "-");
          return rowSlug === slug;
        });
        setCandidate(found);
      },
    });
  }, [slug]);

  if (!candidate)
    return <p className='text-center mt-8'>Loading candidate profile...</p>;

  return (
    <div className='relative min-h-screen'>
      {/* Background image */}
      <div className='absolute inset-0'>
        <img
          src={candidate.link_image}
          alt='Background'
          className='w-full h-full object-cover'
        />
        {/* Black blur overlay */}
        <div className='absolute inset-0 backdrop-blur-sm bg-black/80'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center justify-center'>
        {/* Profile Header */}
        <div className='flex flex-col w-full max-w-3xl mt-8 mb-8 mx-auto p-6 bg-white/80 shadow-lg rounded-t-lg items-center text-center'>
          <img
            src={candidate.link_image}
            alt={candidate.full_name}
            className='w-32 h-32 rounded-full object-cover mb-4 border-2 border-[#8B0000]'
          />
          <h2 className='text-2xl font-bold'>{candidate.full_name}</h2>
          <p className='text-sm text-black-500'>{candidate.party}</p>
          <p className='text-lg text-black-800'>{candidate.profession}</p>
        </div>

        {/* Details */}
        <div className='max-w-3xl mx-auto mb-8 p-6 bg-white/80 shadow-lg'>
          {/* Background */}
          <div className='max-w-3xl mx-auto mb-0 p-6 '>
            {/* Background */}
            <div className='mt-4'>
              <h3 className='text-lg text-center font-bold mb-2'>Background</h3>
              <p
                className={`text-gray-700 text-justify transition-all duration-300 ${
                  showFullBackground ? "max-h-none" : "max-h-40 overflow-hidden"
                }`}
              >
                {candidate.background}
              </p>
              {candidate.background.length > 300 && ( // 👈 only show button if text is long
                <div className='text-center mt-2'>
                  <button
                    onClick={() => setShowFullBackground(!showFullBackground)}
                    className='text-blue-600 hover:no-underline'
                  >
                    {showFullBackground ? "Show less" : "See more"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className='mt-12 '>
            <h3 className='text-lg text-left font-bold mb-4'>
              Basic Information
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 justify-center mx-auto'>
              <div>
                <strong>Birthdate:</strong> {formatDate(candidate.birthdate)}
              </div>
              <div>
                <strong>Age:</strong> {candidate.age}
              </div>
              <div>
                <strong>Birthplace:</strong> {candidate.birthplace}
              </div>
              <div>
                <strong>Sex:</strong> {candidate.sex}
              </div>
              <div>
                <strong>Civil Status:</strong> {candidate.civil_status}
              </div>
              <div>
                <strong>Spouse:</strong> {candidate.spouse}
              </div>
            </div>
          </div>

          {/* Education */}
          <div className='mt-12'>
            <h3 className='text-lg font-bold mb-4'>Education</h3>
            <ul className='list-disc list-outside pl-5 text-gray-700'>
              {candidate.education?.split("\n").map((item, index) => (
                <li key={index} className='text-left'>
                  {item.trim()}
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div className='mt-12'>
            <h3 className='text-lg font-bold mb-2'>Achievements</h3>
            {candidate.achievements &&
            candidate.achievements.split("\n").length === 1 ? (
              <p className='text-gray-700 text-justify'>
                {candidate.achievements.trim()}
              </p>
            ) : (
              <ul className='list-disc list-outside pl-5 text-gray-700'>
                {candidate.achievements?.split("\n").map((item, index) => (
                  <li key={index} className='text-left'>
                    {item.trim()}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Key Positions Held */}
          <div className='mt-12'>
            <h3 className='text-lg font-bold mb-4'>Key Position Held</h3>
            {candidate.key_positions_held &&
            candidate.key_positions_held.split("\n").length === 1 ? (
              <p className='text-gray-700 text-left'>
                {candidate.key_positions_held.trim()}
              </p>
            ) : (
              <ul className='list-disc list-outside pl-5 text-gray-700'>
                {candidate.key_positions_held
                  ?.split("\n")
                  .map((item, index) => (
                    <li key={index} className='text-left'>
                      {item.trim()}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Advocacy */}
          <div className='mt-12'>
            <h3 className='text-lg  font-bold mb-2'>Advocacy / Platform</h3>
            {candidate.advocacy_or_platform &&
            candidate.advocacy_or_platform.split("\n").length === 1 ? (
              <p className='text-gray-700 text-left'>
                {candidate.advocacy_or_platform.trim()}
              </p>
            ) : (
              <ul className='list-disc list-outside pl-5 text-gray-700'>
                {candidate.advocacy_or_platform
                  ?.split("\n")
                  .map((item, index) => (
                    <li key={index} className='text-left'>
                      {item.trim()}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Bills Filed */}
          <div className='mt-12'>
            <h3 className='text-lg  font-bold mb-2'>Bills Filed</h3>
            {candidate.bills_filed &&
            candidate.bills_filed.split("\n").length === 1 ? (
              <p className='text-gray-700 '>{candidate.bills_filed.trim()}</p>
            ) : (
              <ul className='list-disc list-outside pl-5 text-gray-700'>
                {candidate.bills_filed?.split("\n").map((item, index) => (
                  <li key={index} className='text-left'>
                    {item.trim()}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Stance */}
          <div className='mt-12'>
            <h3 className='text-lg font-bold mb-4'>Stance</h3>
            {candidate.stance && candidate.stance.split("\n").length === 1 ? (
              <p className='text-gray-700 text-left'>
                {candidate.stance.trim()}
              </p>
            ) : (
              <ul className='list-disc list-outside pl-5 text-gray-700'>
                {candidate.stance?.split("\n").map((item, index) => (
                  <li key={index} className='text-left'>
                    {item.trim()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
