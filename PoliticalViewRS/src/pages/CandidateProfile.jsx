import React from "react";
import { useParams } from "react-router-dom";

const CandidateProfile = () => {
  const { slug } = useParams();

  // You can later fetch candidate details based on the slug
  return (
    <div className="min-h-screen bg-[#212121]  text-white p-8">
      <h1 className="text-3xl font-bold">Candidate Profile</h1>
      <p className="text-lg mt-4">
        Showing details for: <strong>{slug}</strong>
      </p>
      {/* TODO: Display full data here */}
    </div>
  );
};

export default CandidateProfile;
