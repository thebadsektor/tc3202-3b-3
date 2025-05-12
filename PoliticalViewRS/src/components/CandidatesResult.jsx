import React from "react";

const CandidatesResult = ({ name, party, imageUrl }) => {
  const slug = name ? name.toLowerCase().replace(/\s+/g, "-") : "";

  const handleViewMore = () => {
    window.open(
      `/candidate/${slug}?name=${encodeURIComponent(name)}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center my-0 border rounded-t-lg p-4 bg-[#172038] w-full shadow-md border-[#172038] space-y-0 sm:space-y-0">
      {/* Left: Image + Info */}
      <div className="flex items-center space-x-4">
        <img
          src={imageUrl}
          alt={`${name}'s photo`}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white object-cover"
        />
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            {name}
          </h2>
          <p className="text-[#E5E5E5] text-sm sm:text-base">{party}</p>
        </div>
      </div>

      {/* Right: Button */}
      <button
        className="bg-white text-[#003366] font-semibold px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-blue-100 transition disabled:opacity-50"
        onClick={handleViewMore}
        disabled={!slug}
      >
        Profile
      </button>
    </div>
  );
};

export default CandidatesResult;
