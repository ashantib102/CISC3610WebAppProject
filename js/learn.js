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
        "Multi‑turn, context‑aware chat",
        "Text & code generation",
        "Plugin & tool integration",
        "Voice & image understanding",
      ],
      useCases: [
        "General Q&A and tutoring",
        "Content drafting & editing",
        "Programming help & debugging",
        "Brainstorming ideas",
      ],
      limitations: [
        "Knowledge cutoff (late 2021/2022)",
        "Can hallucinate or err",
        "Finite context window",
        "May reflect training biases",
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
        "Constitutional AI safety guardrails",
        "Huge (100k token) context window",
        "Transparent, explanatory style",
        "Strong reasoning & coding improvements",
      ],
      useCases: [
        "Summarizing long documents",
        "In‑depth research Q&A",
        "Code generation & review",
        "Creative & analytical writing",
      ],
      limitations: [
        "Usage rate/message limits",
        "Sometimes over‑cautious or verbose",
        "Factual errors and hallucinations",
        "Limited third‑party integrations",
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
        "Native multimodal input/output",
        "Tool use & agentic task planning",
        "Advanced chain‑of‑thought reasoning",
        "Tiered models (Nano, Pro, Ultra)",
      ],
      useCases: [
        "Image/video analysis & captioning",
        "Complex research & planning",
        "Multimodal assistants",
        "Enterprise agent applications",
      ],
      limitations: [
        "Closed, Google‑hosted only",
        "Can hallucinate confidently",
        "High compute & latency",
        "Limited direct customization",
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
        "Chat‑based UI prototyping",
        "Production‑ready React code",
        "Live preview & iterative refinement",
        "Auto‑import of NPM/Tailwind components",
      ],
      useCases: [
        "Rapid front‑end prototyping",
        "Design‑to‑code conversion",
        "Learning React/Tailwind patterns",
        "Generating boilerplate UI",
      ],
      limitations: [
        "Front‑end only (no backend)",
        "Generated code often needs tweaks",
        "Context memory can drift",
        "Subscription‑based with usage caps",
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
        "Multi‑line, context‑aware completion",
        "Copilot Chat for in‑IDE Q&A",
        "Broad language & framework support",
        "Pull‑request & CI integration (Copilot X)",
      ],
      useCases: [
        "Boilerplate & repetitive code",
        "Learning new APIs/frameworks",
        "Code explanations & docs",
        "Test & refactoring assistance",
      ],
      limitations: [
        "May suggest insecure/buggy code",
        "License‑leakage risk from training data",
        "Requires paid subscription",
        "Privacy concerns sending code to cloud",
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
        "Fully open‑source research license",
        "Bilingual (English & Chinese) training",
        "MoE efficiency with huge context (128k)",
        "Competitive coding & reasoning scores",
      ],
      useCases: [
        "Self‑hosted chatbots & assistants",
        "Bilingual translation & tutoring",
        "Local code analysis & generation",
        "Research & fine‑tuning experiments",
      ],
      limitations: [
        "High hardware requirements",
        "Custom license on derivatives",
        "Immature ecosystem/tools",
        "Slower, less polished latency",
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
        "Next‑gen AI autocomplete",
        "Codebase‑aware chat & diffs",
        "Project‑wide refactoring",
        "Built‑in docs indexing/search",
      ],
      useCases: [
        "Day‑to‑day software development",
        "Fast onboarding of new codebases",
        "Large‑scale refactoring",
        "Learning & experimenting inline",
      ],
      limitations: [
        "Performance drops in large repos",
        "Subscription + cloud‑dependency",
        "Occasional inaccurate suggestions",
        "Smaller plugin/community ecosystem",
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
