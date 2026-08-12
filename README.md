<div align="center">

# 🎓 EduAssist AI — Smart Educational Assistant

**A Prompt Engineering Educational Platform Powered by Google Gemini 3.1**

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-3.1_Flash-886FBF?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000.svg?style=for-the-badge&logo=express)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

</div>

---

## 🌟 Overview

**EduAssist AI** is a state-of-the-art educational chatbot and prompt engineering platform designed for students, developers, and educators. It combines dynamic persona switching with Advanced Prompt Engineering techniques (Zero-Shot, One-Shot, Few-Shot, Role-Based, and Step-by-Step Reasoning) to generate tailored academic responses using Google's **Gemini 3.1 Flash API**.

Built with an ultra-sleek **Electric Indigo & Dark Obsidian Slate** glassmorphic interface, EduAssist AI delivers a smooth user experience across desktop and mobile devices.

---

## ✨ Key Features

- 🎓 **Dynamic Persona Selector**: Switch seamlessly between 6 customized assistant personas:
  - `Student Assistant` — Concise explanations with study tips and viva prep.
  - `Academic Mentor` — In-depth academic breakdowns with references.
  - `Senior Developer` — Production-grade code snippets with complexity analysis.
  - `Technical Interviewer` — Interactive mock technical interview questions.
  - `Cloud Solutions Architect` — System design and cloud architecture guidance.
  - `Assignment Evaluator` — Rubric-based assignment reviews and feedback.

- ⚡ **Prompt Engineering Engine**: Test and inspect 5 core prompt techniques:
  - **Zero-Shot Prompting**: Direct task execution without prior examples.
  - **One-Shot Prompting**: Guided generation using a single reference sample.
  - **Few-Shot Prompting**: Pattern-matching generation using multi-sample pairs.
  - **Role-Based Persona**: Domain-specific tone and instruction tuning.
  - **Step-by-Step Reasoning**: Chain-of-thought breakdown for complex queries.

- 🔍 **Live System Prompt Inspection**: View and copy the compiled system prompt before or after sending queries.
- 🎨 **Modern Glassmorphic UI**: High-end Obsidian Slate theme (`#090D16`), vibrant Electric Indigo gradients (`#6366F1`), and smooth micro-animations.
- 📄 **Export & Utility Tools**:
  - One-click **PDF Export** of formatted AI responses.
  - Response generation **latency benchmark** in seconds.
  - Rich **Markdown rendering** (tables, headings, syntax-highlighted code blocks).
  - Copy response text to clipboard.
- 📱 **Mobile-Responsive Drawer**: Fully responsive sidebar overlay for smaller screens.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3 (Vanilla Glassmorphism), JavaScript (ES6+), Marked.js, jsPDF |
| **Backend** | Node.js, Express.js, CORS, Dotenv |
| **AI Integration** | `@google/genai` (Google Gen AI SDK v2.15.0) |
| **Models Supported** | `gemini-3.1-flash-lite`, `gemini-2.5-flash-lite`, `gemini-2.0-flash` |
| **Typography** | `Plus Jakarta Sans` (UI text), `JetBrains Mono` (Code blocks) |

---

## 📁 Project Structure

```text
EduAssist-AI-Chatbot/
├── public/
│   ├── index.html        # Glassmorphic layout & SVG icon markup
│   ├── style.css         # CSS design system (Variables, Glassmorphism, Animations)
│   └── script.js         # Frontend controller, API handler, Marked.js & PDF exporter
├── server.js             # Express API server with dynamic Gemini model fallback
├── .env                  # Environment variables (API Key & Port)
├── .gitignore            # Protects .env and node_modules from git
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone Repository
```bash
git clone https://github.com/Ayush07-Desktop/EduAssist-AI-Chatbot.git
cd EduAssist-AI-Chatbot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=5000
```

> [!IMPORTANT]
> Never commit your `.env` file to version control. The repository includes a `.gitignore` file to safeguard your secret API key.

### 4. Run Development Server
```bash
npm run dev
# or
npm start
```

### 5. Access the Application
Open your browser and navigate to:
```text
http://localhost:5000
```

---

## 💡 Example Prompt Scenarios

| Category | Example Query | Recommended Role |
|---|---|---|
| **Cloud Computing** | *"Explain Cloud Architecture and compare IaaS vs PaaS."* | `Cloud Architect` |
| **Exam Preparation** | *"Generate 5 viva questions with answers on IoT protocols."* | `Student Assistant` |
| **Coding & Algorithms**| *"Explain QuickSort algorithm with JavaScript code and O(n) complexity."* | `Senior Developer` |
| **Study Management** | *"Create a structured 7-day study plan for Operating Systems."* | `Academic Mentor` |

---

## 🔒 Security & Best Practices

- **Server-Side API Calls**: All interactions with Google Gemini API occur securely on the backend server (`server.js`). The API key is never exposed to client-side scripts.
- **Model Fallback Chain**: Server dynamically negotiates available endpoints (`gemini-3.1-flash-lite` -> `gemini-2.5-flash-lite` -> `gemini-2.0-flash`) ensuring reliable uptime.
- **Error Handling**: Graceful error handling prevents internal stack traces from leaking to the frontend.

---

## 👨‍💻 Author

**Ayush Kumar Senapati**  
*B.Tech in Computer Science and Engineering*  
Centurion University of Technology and Management, Bhubaneswar, Odisha  

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.

---

<div align="center">
  <sub>Built with ❤️ for academic excellence and prompt engineering research.</sub>
</div>
