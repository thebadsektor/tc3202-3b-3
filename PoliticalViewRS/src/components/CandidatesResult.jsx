import React from "react";

const CandidatesResult = ({ name, party, imageUrl }) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  // Assume you want to navigate to /candidate/{slugified-name}
  const handleViewMore = () => {
    window.open(`/candidate/${slug}`, "_blank");
  };

  return (
    <div className="flex justify-between items-center border rounded-t-lg p-4 bg-[#172038] w-full shadow-md border-[#172038]">
      {/* Left: Image + Info */}
      <div className="flex items-center">
        <img
          src={imageUrl}
          alt={`${name}'s photo`}
          className="w-20 h-20 rounded-full border-2 border-white-900 object-cover mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold text-white">{name}</h2>
          <p className="text-[#E5E5E5]">{party}</p>
        </div>
      </div>

      {/* Right: Button */}
      <button
        className="bg-[#fff] text-[#003366] font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition"
        onClick={handleViewMore}
      >
        View More
      </button>
    </div>
  );
};

export default CandidatesResult;
