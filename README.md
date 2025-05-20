# WhyNotMe

//include demo link// 
                               
<p align="center">

  
  <img src="/wnm.png" alt="wnm" width="300" height="200"/>
</p>

<p align="center"><em>""Every expert was once a beginner who dared to ask, 'Why not me?'""</em></p>


### Introduction:
  
WhyNotMe is a dynamic web platform built to empower students and aspiring professionals — especially those who doubt their place in the world of tech. Whether you're crafting your first resume or navigating the hiring maze, WhyNotMe is the website which includes a launchpad with different resources such as a confidence calculator, Resume Builder, HireLens, Hiring process, Story Hub and
an #WhyNotMe page.

### Overview:
To empower women to confidently pursue , prepare for, and  thrive in tech careers.

Increase confidence → job applications → retention
Build supportive tech community
Data-driven progress tracking for actual growth

WhyNotMe/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── logo.png
├── backend/
│   └── src/
│       └── com.whynotme/
│           ├── Confidence Calculator.html
│           ├── Resume Builder.html
│           └── Hirelens.html
            ├── hiring process.html
            ├── Storyhub.html

├── README.md
└── demo-link.txt

### DataFlow:

1. User Interacts with Web App (Frontend)
Tools: HTML + CSS + JavaScript
Actions:

Enters data into forms (Resume Builder, Confidence Calculator)

Clicks buttons or submits inputs

Views resources and stories

↓

2. JavaScript Processes Input
Role: Validates data, formats it, handles UI updates
Example:

Confidence Calculator computes score from selected inputs

Resume Builder gathers and packages form data

↓

3. Data Sent to Java Backend (API Request)
Method: fetch() or XMLHttpRequest using POST or GET
Content: JSON payload (e.g., {name: "Sara", experience: "2 years"})

↓

4. Java Backend Receives & Processes
Tech: Java Servlet / Spring Boot Controller
Actions:

Validates the data

Performs logic (e.g., scoring, keyword extraction)

Saves to a database (if needed)

Returns response (e.g., success message, formatted resume)

↓

5. Response Sent Back to Frontend
Type: JSON or HTML snippet
Use:

Display confidence score

Show generated resume

Confirm submission to Story Hub

↓

6. User Views Final Output
Personalized feedback

Downloadable resume

Shared success stories


### Features:
- Confidence calculator to discover how much the user is ready.
- Resume builder to create a resume with templates to choose from with user input to
  complete.
- HireLens has the user upload their resume and a link to a job to apply for.
- Hiring process includes insight on common interview practices and additional preparation.
- Story hub highlights stores from women who applied and succeeded through WhyNotMe.
- #WhyNotMe encourages user to share their story through various platforms.

### Conclusions:
The WhyNotMe platform was designed to empower students and aspiring professionals, especially those underrepresented in tech, by providing accessible tools to build confidence and career-readiness. 

### FutureWorks:
Sustainable Impacts:
Mentorship Network – Connect users with mentors for guidance and motivation.
Growing Story Hub – Keep collecting and showcasing real success stories.
Resume & Confidence Circles – Host peer-led resume reviews and mock interviews.
Open-Source Expansion – Invite contributors to build and improve features.
Partner with NGOs – Collaborate with women-in-tech and inclusion-focused groups.
Personal Growth Dashboard – Add a tracker for goals, habits, and reflections.
#WhyNotMe Movement – Promote user wins and stories on social media regularly.

### Contribution Guidelines:
- HTML
- CSS
- JavaScript
- Gemini.AI


  License © 2025 Why Not Me? 

