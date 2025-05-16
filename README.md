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
.venv\Scripts\activate # cmd
source .venv/Scripts/activate # Windows or Git Bash
source .venv/bin/activate # Mac OS or Linux
pip install -r requirements.txt
```

3.  **Configure environment variables**

- Set up **MongoDB** **—** This system uses **MongoDB** as its database.

  - Log in to [MongoDB Atlas](https://www.mongodb.com/try) 🡄
  - Create a cluster (1 click).
  - Create a user with Username & Password.
  - Whitelist your IP (or allow all).
  - Copy the provided connection string.
  - In `Backend` directory, Create a file named `.env` and paste it like

```env
MONGO_URI=mongodb+srv://<your_user>:<your_pass>@<cluster>.mongodb.net/test?retryWrites=true&w=majority
```

- Get your API Key **—** Some features require an API key
  - Get your API key here at [Google AI Studio](https://aistudio.google.com/apikey) 🡄
  - Log in with your Google account to access Google AI Studio.
  - Select **Build with the Gemini API** to get your own API key.
  - Generate and Copy your API key.
  - With the same `.env` file, paste your generated API key.

```env
API_KEY=(Paste your API key here)
MONGO_URI=mongodb+srv://<your_user>:<your_pass>@<cluster>.mongodb.net/test?retryWrites=true&w=majority
```

- Activate the virtual environment

```bash
.venv\Scripts\activate # cmd
source .venv/Scripts/activate # Windows or Git Bash
source .venv/bin/activate # Mac OS or Linux
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
.venv\Scripts\activate # cmd
source .venv/Scripts/activate # Windows or Git Bash
source .venv/bin/activate # Mac OS or Linux
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
- **Gabot, Angelo**: Front-End Developer
- **Gerald Villaran**: Course Instructor

## Project Timeline

- **Week 1-2**: Research and project planning.
- **Week 3-5**: Design and setup.
- **Week 6-10**: Implementation.
- **Week 11-12**: Testing and debugging.
- **Week 13-14**: Final presentation and documentation.

## Changelog

### [Version 1.0.2] - 2025-05-16

- New prompt in README.md for Mac and Linux

## Acknowledgments

This project was made possible thanks to the help of our professors. Mr. Gerald Villaran for his expertise in Machine Learning, Ms. Mary Grace Guillermo for her insights on documentation and Ms. Joville Avila for her support in UI/UX design. Their contributions and feedback played a crucial role in shaping this system into what it is today.

## License

This project is licensed under the MIT License.
