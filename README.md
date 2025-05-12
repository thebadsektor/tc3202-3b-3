# TC-3202 Political View Recommendation System

![Municipal Icon](PoliticalViewRS/src/assets/Municipal%20icon.png)

## Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Objectives](#objectives)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage Instructions](#usage-instructions)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [Chagelog](#changelog)
- [Acknowledgments](#acknowledgments)
- [License](#license)

---

## Introduction

This system help the user to gain views and position of various politician based on their insight preference and values. Upon generating the users politicians stance, the system provides personalized recommendations that match users political personality. This system aim to help the voters make more informed decisions by presenting politicians whose align with their own, enhancing political decision-making.

## Project Overview

Describe the project in detail. Include:

- The project's background or context.
- Its target audience or users.
- Any real-world applications or potential impact.

## Objectives

State the main objectives of the capstone project, such as:

- Develop a solution for [problem].
- Implement features to [goal].
- Test and validate [key aspect].

## Features

List the main features of the project:

- Feature 1: Brief description.
- Feature 2: Brief description.
- Feature 3: Brief description.

## Technologies Used

- Programming Languages: Python, JavaScript
- Frameworks/Libraries: React, Flask
- Databases: MongoDB
- Other Tools: Git

## Setup and Installation

Step-by-step instructions for setting up the project locally.

1.  **Clone the repository:**

```bash
git clone https://github.com/thebadsektor/tc3202-3b-3.git
```

2.  **Install dependencies:**

- If using `npm`:

```bash
cd PoliticalViewRS/
npm install
```

- If using `pip` (for Python projects):

```bash
cd Backend
python -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
```

3.  **Configure environment variables (if any)**:

```bash
source .venv/Scripts/activate
```

4.  **Run the project:**

- For web projects:

```bash
cd PoliticalViewRS/
npm run dev
```

- For backend services:

```bash
cd Backend/
source .venv/Scripts/activate
python server.py
```

## Usage Instructions

Provide detailed instructions on how to use the project after setup:

- How to access the application.
- Example commands or API calls (if applicable).
- Databases: [e.g., MySQL, MongoDB, etc.]
- Screenshots or GIFs showcasing key functionalities (optional).

![UI Placeholder](https://via.placeholder.com/1200x700.png?text=UI+Placeholder)

Another Screenshot

![UI Placeholder](https://via.placeholder.com/1200x700.png?text=UI+Placeholder)

## Project Structure

```bash
.
├── 📂 Backend
│   ├── 📂 Data
│   │   ├── candidates.csv
│   │   ├── csv_to_json.py
│   │   ├── politician_articles.csv
│   │   └── politicians_matches.json
│   ├── 📂 GeminiAPI
│   │   ├── __init__.py
│   │   ├── candidate_utils.py
│   │   ├── generatestatement.py
│   │   ├── get_politician_matches.py
│   │   ├── politician_comparison.py
│   │   ├── politician_statements.py
│   │   ├── politician_values.py
│   │   └── predict_values.py
│   ├── 📂 model
│   │   └── match_candidates.py
│   ├── 📂 mongodb
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── db.py
│   │   ├── main.py
│   │   └── politician_recommendation.py
│   ├── .gitignore
│   ├── package-lock.json
│   ├── requirements.txt
│   └── server.py
├── 📂 PoliticalViewRS
│   ├── 📂 public
│   │   └── candidates.csv
│   ├── 📂 src
│   │   ├── 📂 assets
│   │   │   ├── 📂 Developers
│   │   │   │   ├── gabot.jpg
│   │   │   │   ├── gabs.jpg
│   │   │   │   ├── genesis.jpg
│   │   │   │   ├── junie.JPG
│   │   │   │   ├── nicks.jpg
│   │   │   │   └── nicole.png
│   │   │   ├── Background.png
│   │   │   ├── introbg.png
│   │   │   ├── introbg2.png
│   │   │   ├── Municipal icon.png
│   │   │   └── react.svg
│   │   ├── 📂 components
│   │   │   ├── CandidatesResult.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── DeveloperCard.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── PoliticalTestModal.jsx
│   │   │   ├── ResultStatusContext.jsx
│   │   │   └── SimpleLayout.jsx
│   │   ├── 📂 data
│   │   │   ├── aboutDevelopers.jsx
│   │   │   └── mainstreamNews.jsx
│   │   ├── 📂 pages
│   │   │   ├── AboutUs.jsx
│   │   │   ├── CandidateProfile.jsx
│   │   │   ├── GetStarted.jsx
│   │   │   ├── MediaWebsites.jsx
│   │   │   ├── PersonalTest.jsx
│   │   │   └── Result.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.css
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── package-lock.json
├── package.json
└── README.md
```

## Contributors

- **Antopina, Junie**: Lead Developer & Back-End Developer
- **Delos Reyes, Genesis**: Front-End Developer
- **Dolorico, Nicole**: Documentation
- **Gabot, Angelo**: Full Stack Developer
- **Gerald Villaran**: Course Instructor

## Project Timeline

- **Week 1-2**: Research and project planning.
- **Week 3-5**: Design and setup.
- **Week 6-10**: Implementation.
- **Week 11-12**: Testing and debugging.
- **Week 13-14**: Final presentation and documentation.

## Changelog

### [Version 1.0.0] - 2024-09-07

- Initial release of the project.
- Added basic functionality for [Feature 1], [Feature 2], and [Feature 3].

### [Version 1.1.0] - 2024-09-14

- Improved user interface for [Feature 1].
- Fixed bugs related to [Feature 2].
- Updated project documentation with setup instructions.

### [Version 1.2.0] - 2024-09-21

- Added new functionality for [Feature 4].
- Refactored codebase for better performance.
- Added unit tests for [Feature 3] and [Feature 4].

## Acknowledgments

This project was made possible thanks to the help of our professors. Mr. Gerald Villaran for his expertise in Machine Learning, Ms. Mary Grace Guillermo for her insights on documentation and Ms. Joville Avila for her support in UI/UX design. Their contributions and feedback played a crucial role in shaping this system into what it is today.

## License

This project is licensed under the MIT License.
