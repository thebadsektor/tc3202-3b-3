import junieImg from "../assets/Developers/junie.JPG";
import genesisImg from "../assets/Developers/genesis.jpg";
import nicksImg from "../assets/Developers/nicole.png";
import gabsImg from "../assets/Developers/gabs.jpg";

const aboutDevelopers = [
  {
    id: "developer-junie",
    name: "Junie Antopina",
    position: "Lead Developer & Backend Developer",
    details:
      "Responsible for designing and implementing the backend architecture of the Politician Recommendation System. Led the integration of AI models, MongoDB database, and API development to ensure reliable data flow and accurate recommendations.",
    image: junieImg,
  },
  {
    id: "developer-angelo",
    name: "Angelo Gabot",
    position: "Front-End Developer",
    details:
      "Specialized in designing and developing the user interface of the Politician Recommendation System. Focused on creating an engaging and intuitive design, including layout, branding, and user interaction to enhance the overall user experience.",
    image: gabsImg,
  },
  {
    id: "developer-genesis",
    name: "Genesis Delos Reyes",
    position: "Front-End Developer",
    details:
      "Focused on building an intuitive and responsive user interface for the Politician Recommendation System using React. Ensured a seamless user experience when answering survey questions and viewing personalized politician suggestions.",
    image: genesisImg,
  },
  {
    id: "developer-nicole",
    name: "Nicole Dolorico",
    position: "Documentation Specialist",
    details:
      "Managed the documentation of the Politician Recommendation System. Prepared user guides, developer manuals, and system diagrams to support ongoing development and future enhancements of the project.",
    image: nicksImg,
  },
];

export default aboutDevelopers;
