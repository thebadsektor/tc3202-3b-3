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
    <div className="flex flex-col sm:flex-row justify-between items-center my-0 rounded-t-lg p-6 bg-[#212121] w-full shadow-md space-y-0 sm:space-y-0">
      {/* Left: Image + Info */}
      <div className="flex items-center space-x-6">
        <img
          src={imageUrl}
          alt={`${name}'s photo`}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white object-cover"
        />
        <div>
          <h2 className="text-white/80 text-4xl font-bold">{name}</h2>
          <p className="text-cyan-500 text-2xl mt-1 font-semibold italic">
            {party}
          </p>
        </div>
      </div>

      {/* Right: Button */}
      <button
        className="bg-[#303030] cursor-pointer text-white text-xl font-semibold px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:font-semibold hover:text-black hover:bg-cyan-300 transition disabled:opacity-50"
        onClick={handleViewMore}
        disabled={!slug}
      >
        Profile
      </button>
    </div>
  );
};

export default CandidatesResult;
