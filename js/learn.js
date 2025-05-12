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
        "Maintains context over multiple conversational turns for coherent follow‑ups.",
        "Generates human‑like text and functional code based on user prompts.",
        "Integrates with plugins and external tools for real‑time data access.",
        "Understands voice commands and analyzes images to enrich interactions.",
      ],
      useCases: [
        "Acting as a virtual tutor by walking students through homework and concepts step by step.",
        "Drafting, rewriting, and polishing blog posts, emails, or social media content quickly.",
        "Assisting developers by generating, reviewing, and debugging code snippets in multiple languages.",
        "Brainstorming creative ideas for projects, marketing campaigns, or writing prompts on demand.",
      ],
      limitations: [
        "Knowledge freezes after 2021–2022, so it cannot discuss the latest events or breakthroughs.",
        "Occasionally invents plausible‑sounding facts, requiring careful user verification of its answers.",
        "Context window is limited, causing it to lose track of long or multi‑session conversations.",
        "May reproduce biases or stereotypes present in its training data, despite moderation layers.",
      ],
      image: "images/chatgpt-logo.png",
      audio: "./sounds/ChatGPTInfo.mp3",
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
        "Summarizing entire research papers, contracts, or books into concise executive briefs.",
        "Answering complex policy or compliance queries with clear, structured explanations.",
        "Reviewing codebases and suggesting targeted improvements or refactors across large files.",
        "Generating in‑depth creative writing such as novels, whitepapers, or technical articles.",
      ],
      limitations: [
        "Subject to strict rate limits and quotas that can interrupt prolonged workflows.",
        "Overly cautious style leads to verbose responses with repeated disclaimers and qualifiers.",
        "May refuse to answer harmless questions if they are misclassified as unsafe.",
        "Despite safety layers, can still hallucinate or misstate nuanced factual details.",
      ],
      image: "./images/claude-logo.webp",
      audio: "./sounds/ClaudeInfo.mp3",
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
        "Analyzing photos or videos to describe scenes, extract text, or detect objects.",
        "Planning complex projects by breaking tasks into actionable steps and executing tools.",
        "Enhancing search results with context‑aware understanding of user intent and visuals.",
        "Powering enterprise chatbots that ingest attachments, voice calls, and long documents.",
      ],
      limitations: [
        "Proprietary Google‑hosted service with no self‑hosting or fine‑tuning options.",
        "Prone to confident but incorrect outputs when lacking up‑to‑date or precise data.",
        "High computational demands cause slower response times on large multimodal queries.",
        "Customization constrained to Google’s API offerings and product integrations.",
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
        "Supports iterative design tweaks via conversational follow‑up prompts.",
      ],
      useCases: [
        "Rapidly prototyping landing pages, dashboards, or marketing sites with minimal setup.",
        "Converting wireframes or descriptions into working UI components for Figma handoff.",
        "Teaching new developers code patterns by generating and inspecting real examples.",
        "Accelerating boilerplate form and layout creation for internal tools and proofs‑of‑concept.",
      ],
      limitations: [
        "Only generates front‑end code; developers must implement back‑end logic themselves.",
        "Generated code often needs manual tweaks for exact styling, responsiveness, and edge cases.",
        "Conversation history can drift, requiring repeated prompts to maintain design consistency.",
        "Usage credits and subscription caps limit the number of prototypes you can generate.",
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
        "Speeding up routine tasks like writing CRUD operations and config files.",
        "Learning unfamiliar libraries by exploring AI‑generated usage examples.",
        "Automatically drafting unit tests and test cases for new functions.",
        "Refactoring code snippets and converting between programming paradigms.",
      ],
      limitations: [
        "May suggest insecure or inefficient code patterns that require manual review.",
        "Risk of reproducing copyrighted code, leading to potential licensing issues.",
        "Requires paid subscription, which may be restricted by organizational policies.",
        "Sends private code to cloud servers, raising compliance and privacy concerns.",
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
        "Deploying private chatbots on local servers without recurring API costs.",
        "Translating and generating content fluently in both English and Chinese contexts.",
        "Running large‑scale code analysis locally by feeding entire repositories as input.",
        "Fine‑tuning or experimenting with new tasks in research without license fees.",
      ],
      limitations: [
        "Heavy models demand multiple high‑end GPUs or large‑memory cloud instances.",
        "Custom derivative license restricts how retrained models can be redistributed.",
        "Community tools and tutorials are less mature than for mainstream LLMs.",
        "Inference latency can be slow without specialized optimizations or quantization.",
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
        "Using AI chat to explore unfamiliar codebases and answer project‑specific questions.",
        "Executing large‑scale renames or API migrations across entire repositories effortlessly.",
        "Accelerating onboarding by letting the AI explain code flow and architecture.",
        "Experimenting with new languages inline, with instant examples and corrections.",
      ],
      limitations: [
        "Performance may degrade on huge repos due to continuous indexing overhead.",
        "Subscription and cloud dependency prevent fully offline or air‑gapped use.",
        "Occasional AI misinterpretations can introduce incorrect code changes.",
        "Smaller community ecosystem means fewer plugins and limited third‑party support.",
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
