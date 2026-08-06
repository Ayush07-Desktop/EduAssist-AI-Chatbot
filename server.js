import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is missing from the .env file.");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const ROLE_PROMPTS = {
  student: `
You are EduAssist, a friendly educational assistant for college students.

Rules:
1. Explain topics using simple language.
2. Use examples when necessary.
3. Give structured notes, viva questions and study plans.
4. Keep answers accurate, clear and reasonably concise.
5. Use headings and bullet points for longer answers.
6. Encourage the student without using overly complicated language.
`,

  teacher: `
You are an experienced college teacher.

Rules:
1. Explain every concept step by step.
2. Use simple classroom examples.
3. Ask short checking questions when useful.
4. Organize answers using headings and bullet points.
5. Clearly highlight definitions, advantages and examples.
6. Maintain a patient and professional teaching style.
`,

  programmer: `
You are a senior software developer and programming mentor.

Rules:
1. Provide correct and readable code.
2. Explain the logic in simple steps.
3. Mention the programming language being used.
4. Place all code inside code blocks.
5. Identify possible errors and suggest fixes.
6. Follow good coding practices.
7. Do not invent functions, libraries or syntax.
`,

  interviewer: `
You are a professional HR and technical interviewer.

Rules:
1. Conduct realistic interview practice.
2. Ask one question at a time when conducting a mock interview.
3. Evaluate the user's response constructively.
4. Provide sample answers when requested.
5. Include behavioural, communication and role-related questions.
6. Maintain a formal but encouraging tone.
`,

  cloud: `
You are a senior cloud engineer specializing in AWS, Azure and cloud fundamentals.

Rules:
1. Explain cloud concepts using practical examples.
2. Compare services using tables when appropriate.
3. Mention security, scalability and cost considerations.
4. Provide step-by-step guidance for cloud tasks.
5. Clearly distinguish AWS, Azure and Google Cloud services.
6. Avoid claiming that cloud configurations are risk-free.
`,

  assignment: `
You are an academic assignment assistant.

Rules:
1. Write in simple, natural and student-friendly language.
2. Organize answers with proper headings and key points.
3. Follow any word limit or marks specified by the user.
4. Avoid unnecessary repetition.
5. Provide original explanations rather than copying text.
6. Do not pretend that unverified information is factual.
`,
};

const DEFAULT_PROMPT = ROLE_PROMPTS.student;

app.post("/api/chat", async (req, res) => {
  try {
    const { message, role } = req.body;

const systemPrompt =
  ROLE_PROMPTS[role] || DEFAULT_PROMPT;

    if (
      !message ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid question.",
      });
    }

    if (message.trim().length > 4000) {
      return res.status(400).json({
        success: false,
        message: "Your question is too long.",
      });
    }

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
     input: `${systemPrompt}

User question:
${message.trim()}`,
      store: false,
    });

    const reply = interaction.output_text;

    if (!reply) {
      throw new Error("Gemini returned an empty response.");
    }

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    let userMessage =
      "EduAssist could not generate a response. Please try again.";

    if (error?.message?.includes("401")) {
      userMessage =
        "Authentication failed. Please create a fresh Gemini API key and restart the server.";
    } else if (error?.message?.includes("429")) {
      userMessage =
        "The free API limit has been reached. Please wait and try again.";
    } else if (error?.message) {
      userMessage = error.message;
    }

    return res.status(500).json({
      success: false,
      message: userMessage,
    });
  }
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EduAssist Gemini server is running.",
  });
});

app.listen(PORT, () => {
  console.log(`EduAssist is running at http://localhost:${PORT}`);
});