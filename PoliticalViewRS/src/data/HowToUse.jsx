import React from "react";

const InstructionsModal = ({ show, onClose, onStart }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
      <div className="bg-white text-black rounded-xl shadow-lg p-8 max-w-md w-full relative flex flex-col items-center text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-black text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Instructions for Using</h2>

        <p className="mb-4 text-base">
          The system will generate two choices at a time and you have to pick one choice until you accomplish the test.
        </p>

        <hr className="my-4 w-full border-gray-300" />

        <h3 className="text-xl font-semibold mb-2">Tagalog:</h3>
        <p className="text-base mb-6">
          Bibigyan ka ng sistema ng dalawang pagpipilian sa bawat pagkakataon at kailangan mong pumili ng isa hanggang sa matapos mo ang pagsusulit.
        </p>

        <div className="flex gap-4 w-full">
          <button
            onClick={() => onStart("english")}
            className="bg-[#202021] hover:bg-black text-white py-2 px-6 rounded-md font-semibold w-full"
          >
            Start
          </button>
          <button
            onClick={() => onStart("tagalog")}
            className="bg-[#202021] hover:bg-black text-white py-2 px-6 rounded-md font-semibold w-full"
          >
            Simulan
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;


//Ito sa pag call

//import React, { useState } from "react";
//import InstructionsModal from "./InstructionsModal";

//function App() {
  //const [showModal, setShowModal] = useState(true);

  //const handleStart = (lang) => {
    //localStorage.setItem("selectedLanguage", lang);
    //console.log("Language selected:", lang);
    // navigate or do other actions
    //setShowModal(false);
  //};

  //return (
    //<div>
      //<InstructionsModal
        //show={showModal}
        //onClose={() => setShowModal(false)}
        //onStart={handleStart}
      ///>
    //</div>
  //);
//}

//export default App;
