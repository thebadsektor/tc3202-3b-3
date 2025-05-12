import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
// import bgImage from "../assets/introbg.png";
import bgImage from "../assets/introbg2.png";
import PoliticalTestModal from "../components/PoliticalTestModal";
import mainstreamNews from "../data/mainstreamNews";
import PoliticianCard from "../components/PoliticianCard";
import InstructionsModal from "../components/HowToUse";

function GetStarted() {
  const [showModal, setShowModal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = Math.ceil(candidates.length / 9);
  const itemsPerPage = 6;

  const handleGetStarted = () => {
    setShowModal(true);
  };

  useEffect(() => {
    fetch("/candidates.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          encoding: "utf-8", // or latin1 if your file is latin
          complete: (results) => {
            setCandidates(results.data);
          },
        });
      });
  }, []);

  useEffect(() => {
    document.title = "Home";
  }, []);

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex(
        (prevIndex) => (prevIndex + 1) % mainstreamNews.length
      );
    }, 4000); // rotates every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("/candidates.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          encoding: "utf-8", // or 'latin1' if needed
          complete: (results) => {
            setCandidates(results.data);
          },
        });
      });
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCandidates = candidates.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(candidates.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleCardClick = (candidate) => {
    const candidateNickname = candidate.nickname;
    if (!candidateNickname) return;

    const slug = candidateNickname.toLowerCase().replace(/\s+/g, "-");
    window.open(
      `/candidate/${slug}?name=${encodeURIComponent(candidateNickname)}`,
      "_blank"
    );
  };

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className='flex flex-col min-h-screen scroll-smooth'>
      {/* Scroll Progress Bar */}
      <div className='fixed top-0 left-0 w-full h-0.5 z-[9999] bg-transparent'>
        <div
          className='h-full transition-all duration-400 ease-out rgb-animate'
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <section
        id='home'
        className='relative h-screen w-full bg-[#303030] text-white flex items-center justify-center text-center px-4'
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          backgroundSize: "contain",
        }}
      >
        <div className='flex flex-col items-center gap-8'>
          <div className='p-3 max-w-3xl mx-auto'>
            <h1 className='font-mono text-5xl font-extrabold text-white mb-4'>
              Vote with clarity
              <br />
              <span className='text-cyan-400 text-4xl'>
                Choose with confidence
              </span>
            </h1>
            <p className='font-mono text-xl text-white'>
              Our system helps users explore their political values and compare
              them with the positions of various politicians. By analyzing
              personal insights, it delivers tailored candidate recommendations
              empowering voters to make informed, value-driven decisions.
            </p>
          </div>
          <button
            onClick={handleGetStarted}
            className='text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-200 hover:scale-110 hover:text-black py-4 px-8 text-lg rounded-lg border border-white font-bold'
          >
            Get Started
          </button>
        </div>
      </section>

      <PoliticalTestModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />

      <section className='bg-[#212121] h-screen flex items-center justify-center px-4 py-10'>
        <div className='max-w-5xl w-full'>
          <h2 className='text-5xl text-white font-semibold mb-10 font-mono text-center'>
            Candidates for Senator
          </h2>

          <div className='max-h-[70vh] flex flex-col'>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6'>
              {currentCandidates
                .slice()
                .sort((a, b) => {
                  const nameA = (a.nickname || "").toLowerCase();
                  const nameB = (b.nickname || "").toLowerCase();
                  return nameA.localeCompare(nameB);
                })
                .map((candidate, index) => (
                  <PoliticianCard
                    key={index}
                    candidate={candidate}
                    onCardClick={handleCardClick}
                  />
                ))}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className='flex items-center justify-center pt-12 space-x-6'>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className='text-2xl font-mono text-white hover:text-cyan-300 w-50 text-center hover:cursor-pointer'
            >
              🡄 Previous
            </button>

            <span className='text-lg font-semibold font-mono text-white'>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className='text-2xl font-mono text-white hover:text-cyan-300 w-40 text-center hover:cursor-pointer'
            >
              Next 🡆
            </button>
          </div>
        </div>
      </section>

      <section className='bg-black h-screen flex items-center px-4 py-10 h-screen px-8 flex flex-col lg:flex-row items-center justify-center gap-20 transition-all duration-1000 ease-in-out'>
        {/* Left Block */}
        <div className='max-w-md text-center lg:text-left'>
          <h2 className='font-mono text-5xl font-extrabold text-white mb-4'>
            STAY INFORMED
            <br />
            <span className='italic text-cyan-400 text-3xl'>
              Empower your vote
            </span>
          </h2>

          <p className='font-mono text-lg text-justify text-white mb-6'>
            Explore trusted news sources covering the latest in politics and
            Halalan 2025. Get insights from leading media outlets to make
            informed, value-driven decisions.
          </p>
          <button
            onClick={() => navigate("/news-sites")}
            className='text-white font-mono animate-pulse cursor-pointer text-2xl rounded-lg px-6 py-2 hover:text-cyan-300'
          >
            Show More News Media 🡆
          </button>
        </div>

        {/* Right Card */}
        <div className='w-[350px] rounded overflow-hidden shadow-2xl group transition-transform duration-230 transform cursor-pointer hover:scale-110'>
          <div className='relative w-full h-[150px]'>
            <img
              key={mainstreamNews[currentNewsIndex].logo_url}
              src={mainstreamNews[currentNewsIndex].logo_url}
              alt={mainstreamNews[currentNewsIndex].name}
              className='absolute inset-0 object-contain w-full h-full p-4 flex items-center justify-center bg-white transition-opacity duration-700'
            />
          </div>

          <div className='bg-white/30 text-white p-4 text-center'>
            <h3 className='text-xl font-bold'>
              {mainstreamNews[currentNewsIndex].name}
            </h3>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <section className='text-white flex bg-black pb-10 justify-center items-center'>
        <button
          onClick={scrollToTop}
          className='text-white text-2xl animate-bounce font-mono font-bold cursor-pointer hover:text-cyan-400'
        >
          🡅 Back to Top
        </button>
      </section>
    </div>
  );
}

export default GetStarted;
