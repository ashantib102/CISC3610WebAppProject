// Learn page functionality
document.addEventListener("DOMContentLoaded", () => {
  let activeModel = null;
  let isPlaying = false;
  let audioError = false;

  const llmData = [
    {
      id: "chatgpt",
      name: "ChatGPT",
      creator: "OpenAI",
      releaseDate: "November 2022",
      description:
        "ChatGPT is a conversational AI chatbot from OpenAI, built on the GPT‑3.5 and GPT‑4 families. It supports multi‑turn dialogue, plugins, and even voice/image inputs on paid plans.",
      keyFeatures: [
        "Maintains context over multiple conversational turns for coherent follow-ups.",
        "Generates human‑like text and functional code based on user prompts.",
        "Integrates with plugins and external tools for real‑time data access.",
        "Understands voice commands and analyzes images to enrich interactions.",
      ],
      useCases: [
        "General Q&A and tutoring",
        "Content drafting & editing",
        "Programming help & debugging",
        "Brainstorming ideas",
      ],
      limitations: [
        "Knowledge freezes after 2021–2022, missing recent developments.",
        "Occasionally invents facts or confidently states incorrect information.",
        "Limited context window can cause loss of earlier details.",
        "May reflect biases or stereotypes present in training data.",
      ],
      image: "images/chatgpt-logo.png",
      audio: "/audio/chatgpt.mp3",
    },
    {
      id: "claude",
      name: "Claude",
      creator: "Anthropic",
      releaseDate: "March 2023",
      description:
        "Claude is Anthropic’s safety‑focused LLM, guided by a “Constitutional AI” framework. It excels at long‑context tasks and aims to be helpful, honest, and harmless.",
      keyFeatures: [
        "Applies Constitutional AI principles to self‑regulate outputs safely.",
        "Handles up to 100,000 tokens, enabling extremely long document analysis.",
        "Explains its reasoning steps and asks clarifying questions when needed.",
        "Offers improved coding and reasoning through iterative model updates.",
      ],
      useCases: [
        "Summarizing long documents",
        "In‑depth research Q&A",
        "Code generation & review",
        "Creative & analytical writing",
      ],
      limitations: [
        "Has rate limits and message quotas that disrupt heavy use.",
        "Tends to produce cautious, verbose answers with repeated disclaimers.",
        "May refuse benign requests flagged as potentially unsafe.",
        "Can still hallucinate or misstate facts despite safety measures.",
      ],
      image: "images/claude-logo.webp",
      audio: "/audio/claude.mp3",
    },
    {
      id: "gemini",
      name: "Gemini",
      creator: "Google",
      releaseDate: "December 2023",
      description:
        "Gemini, from Google DeepMind, is a multimodal AI that handles text, images, audio, and video. It integrates tool‑use and “agentic” planning for advanced workflows.",
      keyFeatures: [
        "Processes text, images, audio, and video for rich multimodal tasks.",
        "Automatically uses external tools to perform actions and fetch data.",
        "Employs chain‑of‑thought reasoning for structured problem-solving.",
        "Provides tiered models balancing performance and resource requirements.",
      ],
      useCases: [
        "Image/video analysis & captioning",
        "Complex research & planning",
        "Multimodal assistants",
        "Enterprise agent applications",
      ],
      limitations: [
        "Proprietary and accessible only via Google’s cloud platform.",
        "Can confidently generate incorrect or misleading content.",
        "High compute demands lead to increased response latency.",
        "Customization limited to Google’s provided APIs and interfaces.",
      ],
      image: "images/gemini-logo.webp",
      audio: "/audio/gemini.mp3",
    },
    {
      id: "v0",
      name: "V0",
      creator: "Vercel",
      releaseDate: "2024",
      description:
        "V0 is Vercel’s AI‑driven UI generator: describe your design in chat and get production‑ready React/Next.js + Tailwind code with live previews.",
      keyFeatures: [
        "Transforms natural language into production‑ready React/Next.js code.",
        "Displays live UI previews that update instantly with each refinement.",
        "Automatically imports npm packages and Tailwind components as needed.",
        "Supports iterative design tweaks via conversational follow-up prompts.",
      ],
      useCases: [
        "Rapid front‑end prototyping",
        "Design‑to‑code conversion",
        "Learning React/Tailwind patterns",
        "Generating boilerplate UI",
      ],
      limitations: [
        "Front‑end only—backend logic and databases require manual implementation.",
        "Generated code often needs developer tweaks for styling and edge cases.",
        "Can lose design context in long chats, needing prompt reminders.",
        "Subscription credits and usage caps may limit prototyping volume.",
      ],
      image: "images/v0-logo.svg",
      audio: "/audio/v0.mp3",
    },
    {
      id: "copilot",
      name: "GitHub Copilot",
      creator: "GitHub & OpenAI",
      releaseDate: "June 2021",
      description:
        "GitHub Copilot is an AI pair‑programmer powered by OpenAI’s Codex/GPT‑4 models. It suggests code and entire functions in real time, right in your IDE.",
      keyFeatures: [
        "Suggests multi‑line code blocks and functions based on context.",
        "Provides in‑IDE chat for debugging, documentation, and reviews.",
        "Adapts to various languages and frameworks with contextual awareness.",
        "Integrates with CI/CD pipelines to auto‑generate pull request summaries.",
      ],
      useCases: [
        "Boilerplate & repetitive code",
        "Learning new APIs/frameworks",
        "Code explanations & docs",
        "Test & refactoring assistance",
      ],
      limitations: [
        "May suggest insecure or inefficient code patterns needing review.",
        "Can reproduce copyrighted snippets, creating potential license issues.",
        "Requires paid subscription, sometimes restricted by company policy.",
        "Sends code to cloud servers, raising privacy considerations.",
      ],
      image: "images/copilot-logo.jpg",
      audio: "/audio/copilot.mp3",
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      creator: "DeepSeek AI",
      releaseDate: "2024",
      description:
        "DeepSeek is an open‑source LLM from DeepSeek AI, offering strong bilingual (English/Chinese) performance, cutting‑edge Mixture‑of‑Experts efficiency, and massive context windows.",
      keyFeatures: [
        "Fully open‑source models you can self‑host without API fees.",
        "Bilingual training delivers strong English and Chinese language support.",
        "Mixture‑of‑Experts design reduces compute cost while boosting capacity.",
        "Supports up to 128k token contexts for very long documents.",
      ],
      useCases: [
        "Self‑hosted chatbots & assistants",
        "Bilingual translation & tutoring",
        "Local code analysis & generation",
        "Research & fine‑tuning experiments",
      ],
      limitations: [
        "Large models require powerful GPUs and extensive memory.",
        "Custom derivative license restricts downstream model usage.",
        "Ecosystem and tooling are less mature than established LLMs.",
        "Interactive latency can be slow without optimized infrastructure.",
      ],
      image: "/images/deepseek-logo.png.webp",
      audio: "/audio/deepseek.mp3",
    },
    {
      id: "cursor",
      name: "Cursor",
      creator: "Anysphere",
      releaseDate: "2022",
      description:
        "Cursor is an AI‑first code editor (a VS Code fork) with deep codebase awareness—offering advanced autocomplete, an AI chat sidebar, and multi‑file edits right in your IDE.",
      keyFeatures: [
        "AI‑powered autocomplete predicts multi‑line code completions intelligently.",
        "Includes codebase‑aware chat and diff previews for context‑driven edits.",
        "Performs project‑wide refactoring by updating multiple files at once.",
        "Indexes popular library docs for instant in‑editor API guidance.",
      ],
      useCases: [
        "Day‑to‑day software development",
        "Fast onboarding of new codebases",
        "Large‑scale refactoring",
        "Learning & experimenting inline",
      ],
      limitations: [
        "Performance can degrade in very large codebases due to indexing.",
        "Subscription and cloud dependency may conflict with offline work.",
        "Occasional incorrect suggestions require manual verification.",
        "Smaller community means fewer extensions and less third‑party support.",
      ],
      image: "images/cursor-logo.png",
      audio: "/audio/cursor.mp3",
    },
  ];

  const canvas = document.getElementById("model-canvas");
  const audio = document.getElementById("model-audio");
  const audioButton = document.getElementById("audio-button");
  const audioButtonText = document.getElementById("audio-button-text");
  const modelButtonsContainer = document.getElementById("model-buttons");
  const modelHeader = document.getElementById("model-header");
  const overviewTab = document.getElementById("overview-tab");
  const featuresTab = document.getElementById("features-tab");
  const usecasesTab = document.getElementById("usecases-tab");
  const limitationsTab = document.getElementById("limitations-tab");
  const prevModelButton = document.getElementById("prev-model");
  const nextModelButton = document.getElementById("next-model");

  // Function to draw fallback content when image loading fails
  const drawFallbackContent = (ctx, canvas, model) => {
    // Clear canvas with appropriate background
    ctx.fillStyle = "#f8f9fa"; // Light background for all models
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw model name
    ctx.fillStyle = "#333333"; // Dark text for all models
    ctx.font = "bold 40px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(model.name, canvas.width / 2, canvas.height / 2 - 30);

    // Draw creator
    ctx.font = "24px Inter, sans-serif";
    ctx.fillText(
      `by ${model.creator}`,
      canvas.width / 2,
      canvas.height / 2 + 20
    );

    // Draw release date
    ctx.font = "18px Inter, sans-serif";
    ctx.fillText(
      `Released: ${model.releaseDate}`,
      canvas.width / 2,
      canvas.height / 2 + 60
    );

    // Add model name as overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
    ctx.fillStyle = "white";
    ctx.font = "bold 24px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(model.name, canvas.width / 2, canvas.height - 25);
  };

  // Function to render model image on canvas
  const renderModelImage = (model) => {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset image error state when model changes
    audioError = false;

    try {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set initial background color - white for all models now
      ctx.fillStyle = "#ffffff"; // White background for all models
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load and draw the model image
      const img = new Image();
      img.crossOrigin = "anonymous"; // Add this to avoid CORS issues

      // Handle image loading errors
      img.onerror = () => {
        console.error(`Failed to load image: ${model.image}`);
        drawFallbackContent(ctx, canvas, model);
      };

      // Handle successful image load
      img.onload = () => {
        // Calculate dimensions to maintain aspect ratio
        const aspectRatio = img.width / img.height;
        let drawWidth = canvas.width * 0.7; // Use 70% of canvas width
        let drawHeight = drawWidth / aspectRatio;

        if (drawHeight > canvas.height * 0.7) {
          drawHeight = canvas.height * 0.7;
          drawWidth = drawHeight * aspectRatio;
        }

        const x = (canvas.width - drawWidth) / 2;
        const y = (canvas.height - drawHeight) / 2;

        // Redraw background (white for all models)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the image
        ctx.drawImage(img, x, y, drawWidth, drawHeight);

        // Add model name as overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
        ctx.fillStyle = "white";
        ctx.font = "bold 24px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(model.name, canvas.width / 2, canvas.height - 25);
      };

      // Set the image source last (this triggers loading)
      img.src = model.image;
    } catch (error) {
      console.error("Error rendering canvas:", error);
      drawFallbackContent(ctx, canvas, model);
    }
  };

  // Function to play/pause audio
  const toggleAudio = () => {
    if (!audio || !activeModel) return;

    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      audioButtonText.textContent = "Play Audio Description";
    } else {
      // Reset error state when attempting to play
      audioError = false;

      try {
        // Check if the audio file is the placeholder
        if (activeModel.audio === "audio/placeholder.mp3") {
          // Set error state since we know this file doesn't exist or is empty
          audioError = true;
          audioButton.disabled = true;
          audioButtonText.textContent = "Audio Unavailable";
          return;
        }

        audio.src = activeModel.audio;

        // Use a promise to handle play() since it returns a promise
        const playPromise = audio.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              isPlaying = true;
              audioButtonText.textContent = "Pause Audio";
            })
            .catch((error) => {
              console.error("Audio playback failed:", error);
              audioError = true;
              isPlaying = false;
              audioButton.disabled = true;
              audioButtonText.textContent = "Audio Unavailable";
            });
        }
      } catch (error) {
        console.error("Error setting up audio:", error);
        audioError = true;
        isPlaying = false;
        audioButton.disabled = true;
        audioButtonText.textContent = "Audio Unavailable";
      }
    }
  };

  // Function to update the UI with the active model
  const updateUI = (model) => {
    if (!model) return;

    // Update header
    modelHeader.innerHTML = `
        <h2 class="card-title">${model.name}</h2>
        <p class="card-description">Created by: ${model.creator} | Released: ${model.releaseDate}</p>
      `;

    // Render model image
    renderModelImage(model);

    // Reset audio
    if (audio) {
      audio.pause();
      isPlaying = false;
      audioButtonText.textContent = "Play Audio Description";
      audioButton.disabled = false;

      // Don't set src if it's the placeholder to avoid unnecessary network requests
      if (model.audio && model.audio !== "audio/placeholder.mp3") {
        try {
          audio.src = model.audio;
        } catch (error) {
          console.error("Error setting audio source:", error);
          audioError = true;
          audioButton.disabled = true;
          audioButtonText.textContent = "Audio Unavailable";
        }
      } else {
        // Clear the source if it's a placeholder
        audio.removeAttribute("src");
        audioError = true;
        audioButton.disabled = true;
        audioButtonText.textContent = "Audio Unavailable";
      }
    }

    // Update tabs content
    overviewTab.innerHTML = `<p>${model.description}</p>`;

    featuresTab.innerHTML = `
        <ul>
          ${model.keyFeatures.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      `;

    usecasesTab.innerHTML = `
        <ul>
          ${model.useCases.map((useCase) => `<li>${useCase}</li>`).join("")}
        </ul>
      `;

    limitationsTab.innerHTML = `
        <ul>
          ${model.limitations
            .map((limitation) => `<li>${limitation}</li>`)
            .join("")}
        </ul>
      `;

    // Update active model button
    const modelButtons = document.querySelectorAll(".model-button");
    modelButtons.forEach((button) => {
      if (button.dataset.modelId === model.id) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  };

  // Function to set the active model
  const setActiveModel = (modelId) => {
    const model = llmData.find((m) => m.id === modelId);
    if (model) {
      activeModel = model;
      updateUI(model);
    }
  };

  // Initialize model buttons
  if (modelButtonsContainer) {
    llmData.forEach((model) => {
      const button = document.createElement("button");
      button.className = "model-button";
      button.dataset.modelId = model.id;
      button.textContent = model.name;
      button.addEventListener("click", () => setActiveModel(model.id));
      modelButtonsContainer.appendChild(button);
    });
  }

  // Initialize tabs
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.dataset.tab;

      // Update active tab button
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Update active tab content
      tabContents.forEach((content) => {
        if (content.id === `${tabName}-tab`) {
          content.classList.add("active");
        } else {
          content.classList.remove("active");
        }
      });
    });
  });

  // Initialize audio button
  if (audioButton) {
    audioButton.addEventListener("click", toggleAudio);
  }

  // Initialize audio events
  if (audio) {
    audio.addEventListener("ended", () => {
      isPlaying = false;
      audioButtonText.textContent = "Play Audio Description";
    });

    audio.addEventListener("error", () => {
      audioError = true;
      isPlaying = false;
      audioButton.disabled = true;
      audioButtonText.textContent = "Audio Unavailable";
    });
  }

  // Initialize navigation buttons
  if (prevModelButton) {
    prevModelButton.addEventListener("click", () => {
      if (!activeModel) return;

      const currentIndex = llmData.findIndex((m) => m.id === activeModel.id);
      const prevIndex = (currentIndex - 1 + llmData.length) % llmData.length;
      setActiveModel(llmData[prevIndex].id);
    });
  }

  if (nextModelButton) {
    nextModelButton.addEventListener("click", () => {
      if (!activeModel) return;

      const currentIndex = llmData.findIndex((m) => m.id === activeModel.id);
      const nextIndex = (currentIndex + 1) % llmData.length;
      setActiveModel(llmData[nextIndex].id);
    });
  }

  // Check URL for model parameter
  const urlParams = new URLSearchParams(window.location.search);
  const modelParam = urlParams.get("model");

  // Set initial active model
  if (modelParam && llmData.some((m) => m.id === modelParam)) {
    setActiveModel(modelParam);
  } else if (llmData.length > 0) {
    setActiveModel(llmData[0].id);
  }
});
