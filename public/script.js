const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");
const sendButton = document.getElementById("sendButton");
const clearButton = document.getElementById("clearButton");

const roleSelector = document.getElementById("roleSelector");
const techniqueSelector =
  document.getElementById("techniqueSelector");

const techniqueBadge =
  document.getElementById("techniqueBadge");

const techniqueDescription =
  document.getElementById("techniqueDescription");

const suggestionButtons = document.querySelectorAll(
  ".suggestion-button"
);

/* About modal elements */

const aboutButton = document.getElementById("aboutButton");
const aboutModal = document.getElementById("aboutModal");

const closeAboutButton =
  document.getElementById("closeAboutButton");

const closeAboutFooterButton =
  document.getElementById("closeAboutFooterButton");

/* Prompt preview modal elements */

const viewPromptButton =
  document.getElementById("viewPromptButton");

const promptModal = document.getElementById("promptModal");

const closePromptButton =
  document.getElementById("closePromptButton");

const closePromptFooterButton =
  document.getElementById("closePromptFooterButton");

const copyPromptButton =
  document.getElementById("copyPromptButton");

const finalPromptPreview =
  document.getElementById("finalPromptPreview");

const promptPreviewRole =
  document.getElementById("promptPreviewRole");

const promptPreviewTechnique =
  document.getElementById("promptPreviewTechnique");

const promptPreviewQuestion =
  document.getElementById("promptPreviewQuestion");

/* Configuration panel elements */

const currentRole =
  document.getElementById("currentRole");

const currentTechnique =
  document.getElementById("currentTechnique");

let lastUserMessage = "";

const techniqueInformation = {
  "zero-shot": {
    badge: "Zero-Shot",
    description:
      "The AI answers directly without receiving any sample answer.",
  },

  "one-shot": {
    badge: "One-Shot",
    description:
      "The AI receives one example before answering the user's question.",
  },

  "few-shot": {
    badge: "Few-Shot",
    description:
      "The AI receives multiple examples to understand the expected response style.",
  },

  "role-based": {
    badge: "Role-Based",
    description:
      "The AI behaves according to the selected professional or educational role.",
  },

  "structured-reasoning": {
    badge: "Structured Reasoning",
    description:
      "The AI analyses the task carefully and presents a clear step-by-step explanation.",
  },
};

function getSelectedRoleText() {
  return roleSelector.options[
    roleSelector.selectedIndex
  ].textContent.trim();
}

function getSelectedTechniqueText() {
  return techniqueSelector.options[
    techniqueSelector.selectedIndex
  ].textContent.trim();
}

function updateTechniqueInformation() {
  const selectedTechnique =
    techniqueInformation[techniqueSelector.value];

  if (!selectedTechnique) {
    return;
  }

  techniqueBadge.textContent =
    selectedTechnique.badge;

  techniqueDescription.textContent =
    selectedTechnique.description;
}

function updateConfigurationPanel() {
  if (currentRole) {
    currentRole.textContent =
      getSelectedRoleText();
  }

  if (currentTechnique) {
    currentTechnique.textContent =
      getSelectedTechniqueText();
  }
}

function buildPromptPreview() {
  const roleText = getSelectedRoleText();
  const techniqueText =
    getSelectedTechniqueText();

  const userQuestion =
    userInput.value.trim() ||
    lastUserMessage ||
    "No question entered yet.";

  if (promptPreviewRole) {
    promptPreviewRole.textContent =
      roleText;
  }

  if (promptPreviewTechnique) {
    promptPreviewTechnique.textContent =
      techniqueText;
  }

  if (promptPreviewQuestion) {
    promptPreviewQuestion.textContent =
      userQuestion;
  }

  const finalPrompt = `
CHATBOT ROLE:
${roleText}

PROMPT ENGINEERING TECHNIQUE:
${techniqueText}

SYSTEM INSTRUCTIONS:
Respond according to the selected chatbot role.
Follow the selected prompt-engineering technique.
Keep the response accurate, clear and suitable for a college student.
Use headings, bullet points, examples and Markdown formatting when helpful.
Avoid false or misleading information.

USER REQUEST:
${userQuestion}
`.trim();

  if (finalPromptPreview) {
    finalPromptPreview.textContent =
      finalPrompt;
  }

  return finalPrompt;
}

function openModal(modal) {
  if (!modal) {
    return;
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  if (!modal) {
    return;
  }

  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function scrollToLatestMessage() {
  chatMessages.scrollTop =
    chatMessages.scrollHeight;
}

function createMessageElement(sender) {
  const messageElement =
    document.createElement("div");

  messageElement.className =
    sender === "user"
      ? "message user-message"
      : "message bot-message";

  const avatarElement =
    document.createElement("div");

  avatarElement.className = "message-avatar";

  avatarElement.textContent =
    sender === "user" ? "You" : "EA";

  const wrapperElement =
    document.createElement("div");

  wrapperElement.className =
    "message-wrapper";

  const contentElement =
    document.createElement("div");

  contentElement.className =
    "message-content";

  wrapperElement.appendChild(contentElement);

  messageElement.appendChild(avatarElement);
  messageElement.appendChild(wrapperElement);

  return {
    messageElement,
    wrapperElement,
    contentElement,
  };
}

function createResponseActions(
  wrapperElement,
  responseText,
  responseTime,
  userPrompt
) {
  const actionsElement =
    document.createElement("div");

  actionsElement.className =
    "response-actions";

  const timeElement =
    document.createElement("span");

  timeElement.className = "response-time";

  timeElement.textContent =
    `⚡ Generated in ${responseTime} sec`;

  const buttonGroup =
    document.createElement("div");

  buttonGroup.className =
    "response-buttons";

  const copyButton =
    document.createElement("button");

  copyButton.type = "button";
  copyButton.className =
    "response-action-button";
  copyButton.textContent = "📋 Copy";

  const pdfButton =
    document.createElement("button");

  pdfButton.type = "button";
  pdfButton.className =
    "response-action-button";
  pdfButton.textContent = "📄 PDF";

  copyButton.addEventListener(
    "click",
    async () => {
      try {
        await navigator.clipboard.writeText(
          responseText
        );

        copyButton.textContent =
          "✅ Copied";

        setTimeout(() => {
          copyButton.textContent =
            "📋 Copy";
        }, 1500);
      } catch {
        copyButton.textContent =
          "Copy failed";

        setTimeout(() => {
          copyButton.textContent =
            "📋 Copy";
        }, 1500);
      }
    }
  );

  pdfButton.addEventListener("click", () => {
    downloadResponseAsPDF(
      responseText,
      userPrompt
    );
  });

  buttonGroup.appendChild(copyButton);
  buttonGroup.appendChild(pdfButton);

  actionsElement.appendChild(timeElement);
  actionsElement.appendChild(buttonGroup);

  wrapperElement.appendChild(actionsElement);
}

function downloadResponseAsPDF(
  responseText,
  userPrompt
) {
  if (
    !window.jspdf ||
    !window.jspdf.jsPDF
  ) {
    alert(
      "PDF library could not be loaded."
    );
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const selectedRole =
    getSelectedRoleText();

  const selectedTechnique =
    getSelectedTechniqueText();

  const generatedDate =
    new Date().toLocaleString();

  const pageWidth =
    pdf.internal.pageSize.getWidth();

  const pageHeight =
    pdf.internal.pageSize.getHeight();

  const margin = 18;
  const usableWidth =
    pageWidth - margin * 2;

  let currentY = 20;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(19);

  pdf.text(
    "EduAssist AI",
    margin,
    currentY
  );

  currentY += 8;

  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");

  pdf.text(
    "Smart Prompt Engineering Chatbot",
    margin,
    currentY
  );

  currentY += 9;

  pdf.setFontSize(9);
  pdf.text(
    `Generated on: ${generatedDate}`,
    margin,
    currentY
  );

  currentY += 6;

  pdf.text(
    `Role: ${selectedRole}`,
    margin,
    currentY
  );

  currentY += 6;

  pdf.text(
    `Prompt Technique: ${selectedTechnique}`,
    margin,
    currentY
  );

  currentY += 10;

  pdf.setDrawColor(180);
  pdf.line(
    margin,
    currentY,
    pageWidth - margin,
    currentY
  );

  currentY += 10;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);

  pdf.text(
    "User Prompt",
    margin,
    currentY
  );

  currentY += 7;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  const promptLines =
    pdf.splitTextToSize(
      userPrompt ||
        lastUserMessage ||
        "Not available",
      usableWidth
    );

  promptLines.forEach((line) => {
    if (
      currentY >
      pageHeight - 20
    ) {
      pdf.addPage();
      currentY = 20;
    }

    pdf.text(
      line,
      margin,
      currentY
    );

    currentY += 6;
  });

  currentY += 6;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);

  pdf.text(
    "AI Response",
    margin,
    currentY
  );

  currentY += 7;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  const cleanResponse = responseText
    .replace(/#{1,6}\s?/g, "")
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/`/g, "")
    .replace(/\|/g, " ")
    .replace(/---+/g, "")
    .trim();

  const responseLines =
    pdf.splitTextToSize(
      cleanResponse,
      usableWidth
    );

  responseLines.forEach((line) => {
    if (
      currentY >
      pageHeight - 20
    ) {
      pdf.addPage();
      currentY = 20;
    }

    pdf.text(
      line,
      margin,
      currentY
    );

    currentY += 6;
  });

  pdf.save(
    "EduAssist-AI-Response.pdf"
  );
}

function addMessage(
  text,
  sender,
  options = {}
) {
  const {
    messageElement,
    wrapperElement,
    contentElement,
  } = createMessageElement(sender);

  if (
    sender === "bot" &&
    typeof marked !== "undefined"
  ) {
    contentElement.innerHTML =
      marked.parse(text);
  } else {
    contentElement.textContent = text;
  }

  if (
    sender === "bot" &&
    options.showActions
  ) {
    createResponseActions(
      wrapperElement,
      text,
      options.responseTime,
      options.userPrompt
    );
  }

  chatMessages.appendChild(
    messageElement
  );

  scrollToLatestMessage();

  return messageElement;
}

function addTypingIndicator() {
  const {
    messageElement,
    contentElement,
  } = createMessageElement("bot");

  contentElement.classList.add(
    "typing-message"
  );

  contentElement.innerHTML = `
    <span>✨ EduAssist is generating</span>

    <span class="typing-dots">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  `;

  chatMessages.appendChild(
    messageElement
  );

  scrollToLatestMessage();

  return messageElement;
}

function resetInputHeight() {
  userInput.style.height = "auto";
}

function setChatControlsDisabled(
  isDisabled
) {
  sendButton.disabled = isDisabled;
  userInput.disabled = isDisabled;
  roleSelector.disabled = isDisabled;
  techniqueSelector.disabled =
    isDisabled;

  if (viewPromptButton) {
    viewPromptButton.disabled =
      isDisabled;
  }
}

async function sendMessage(message) {
  lastUserMessage = message;

  const selectedRole =
    roleSelector.value;

  const selectedTechnique =
    techniqueSelector.value;

  addMessage(message, "user");

  userInput.value = "";
  resetInputHeight();

  setChatControlsDisabled(true);

  const typingIndicator =
    addTypingIndicator();

  const startTime =
    performance.now();

  try {
    const response = await fetch(
      "/api/chat",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          message,
          role: selectedRole,
          technique:
            selectedTechnique,
        }),
      }
    );

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error(
        "The server returned an invalid response."
      );
    }

    typingIndicator.remove();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "EduAssist could not generate an answer."
      );
    }

    if (!data.reply) {
      throw new Error(
        "The AI returned an empty response."
      );
    }

    const endTime =
      performance.now();

    const responseTime =
      (
        (endTime - startTime) /
        1000
      ).toFixed(2);

    addMessage(data.reply, "bot", {
      showActions: true,
      responseTime,
      userPrompt: message,
    });
  } catch (error) {
    if (typingIndicator.isConnected) {
      typingIndicator.remove();
    }

    addMessage(
      `Error: ${
        error.message ||
        "Something went wrong. Please try again."
      }`,
      "bot"
    );
  } finally {
    setChatControlsDisabled(false);
    userInput.focus();
  }
}

/* Chat form */

chatForm.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();

    const message =
      userInput.value.trim();

    if (!message) {
      userInput.focus();
      return;
    }

    sendMessage(message);
  }
);

/* Enter to send */

userInput.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      chatForm.requestSubmit();
    }
  }
);

/* Auto-resize input */

userInput.addEventListener(
  "input",
  () => {
    resetInputHeight();

    userInput.style.height =
      `${Math.min(
        userInput.scrollHeight,
        130
      )}px`;
  }
);

/* Suggestion buttons */

suggestionButtons.forEach(
  (button) => {
    button.addEventListener(
      "click",
      () => {
        userInput.value =
          button.textContent.trim();

        resetInputHeight();

        userInput.style.height =
          `${Math.min(
            userInput.scrollHeight,
            130
          )}px`;

        userInput.focus();
      }
    );
  }
);

/* Clear chat */

clearButton.addEventListener(
  "click",
  () => {
    const shouldClear =
      window.confirm(
        "Are you sure you want to clear the conversation?"
      );

    if (!shouldClear) {
      return;
    }

    chatMessages.innerHTML = "";
    lastUserMessage = "";

    addMessage(
      `Hello! The conversation has been cleared.

Choose a chatbot role and a prompt-engineering technique, then ask your question.`,
      "bot"
    );

    userInput.value = "";
    resetInputHeight();
    userInput.focus();
  }
);

/* Technique selection */

techniqueSelector.addEventListener(
  "change",
  () => {
    updateTechniqueInformation();
    updateConfigurationPanel();
  }
);

/* Role selection */

roleSelector.addEventListener(
  "change",
  () => {
    updateConfigurationPanel();

    const selectedRoleText =
      getSelectedRoleText();

    addMessage(
      `Role changed to **${selectedRoleText}**. My next response will follow this role.`,
      "bot"
    );
  }
);

/* About modal */

if (aboutButton) {
  aboutButton.addEventListener(
    "click",
    () => {
      openModal(aboutModal);
    }
  );
}

if (closeAboutButton) {
  closeAboutButton.addEventListener(
    "click",
    () => {
      closeModal(aboutModal);
    }
  );
}

if (closeAboutFooterButton) {
  closeAboutFooterButton.addEventListener(
    "click",
    () => {
      closeModal(aboutModal);
    }
  );
}

/* Prompt preview modal */

if (viewPromptButton) {
  viewPromptButton.addEventListener(
    "click",
    () => {
      buildPromptPreview();
      openModal(promptModal);
    }
  );
}

if (closePromptButton) {
  closePromptButton.addEventListener(
    "click",
    () => {
      closeModal(promptModal);
    }
  );
}

if (closePromptFooterButton) {
  closePromptFooterButton.addEventListener(
    "click",
    () => {
      closeModal(promptModal);
    }
  );
}

/* Copy final prompt */

if (copyPromptButton) {
  copyPromptButton.addEventListener(
    "click",
    async () => {
      const promptText =
        buildPromptPreview();

      try {
        await navigator.clipboard.writeText(
          promptText
        );

        copyPromptButton.textContent =
          "✅ Copied";

        setTimeout(() => {
          copyPromptButton.textContent =
            "📋 Copy Prompt";
        }, 1500);
      } catch {
        copyPromptButton.textContent =
          "Copy failed";

        setTimeout(() => {
          copyPromptButton.textContent =
            "📋 Copy Prompt";
        }, 1500);
      }
    }
  );
}

/* Close modal by clicking overlay */

if (aboutModal) {
  aboutModal.addEventListener(
    "click",
    (event) => {
      if (
        event.target === aboutModal
      ) {
        closeModal(aboutModal);
      }
    }
  );
}

if (promptModal) {
  promptModal.addEventListener(
    "click",
    (event) => {
      if (
        event.target === promptModal
      ) {
        closeModal(promptModal);
      }
    }
  );
}

/* Escape key closes modals */

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (
      aboutModal &&
      !aboutModal.classList.contains(
        "hidden"
      )
    ) {
      closeModal(aboutModal);
    }

    if (
      promptModal &&
      !promptModal.classList.contains(
        "hidden"
      )
    ) {
      closeModal(promptModal);
    }
  }
);

/* Initial setup */

updateTechniqueInformation();
updateConfigurationPanel();
userInput.focus();