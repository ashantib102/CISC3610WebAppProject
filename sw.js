// Service Worker for PWA
const CACHE_NAME = "llm-explorer-v1";

// Resources to cache
const RESOURCES_TO_CACHE = [
  "./",
  "./index.html",
  "./learn.html",
  "./about.html",
  "./promo.html",
  "./manifest.json",
  "./css/styles.css",
  "./js/app.js",
  "./js/learn.js",
  "./js/install.js",
  "./images/llm-explorer-new-logo.png",
  "./images/chatgpt-logo.png",
  "./images/claude-logo.webp",
  "./images/gemini-logo.webp",
  "./images/v0-logo.svg",
  "./images/copilot-logo.jpg",
  "./images/deepseek-logo.png.webp",
  "./images/cursor-logo.png",
  "./images/llm-explorer-home.png",
  "./images/llm-explorer-details.png",
  "./images/llm-explorer-mobile-app.png",
  "./sounds/ChatGPTInfo.mp3",
  "./sounds/ClaudeInfo.mp3"
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opening cache");
        return Promise.allSettled(
          RESOURCES_TO_CACHE.map((url) => {
            return cache.add(url).catch((error) => {
              console.error(`Failed to cache: ${url}`, error);
              // Continue with other resources even if one fails
              return Promise.resolve();
            });
          })
        );
      })
      .then(() => {
        console.log("Cache populated successfully");
      })
      .catch((error) => {
        console.error("Cache population failed:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Clone the request because it can only be used once
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest)
        .then((response) => {
          // Check if valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response because it can only be used once
          const responseToCache = response.clone();

          caches
            .open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            })
            .catch((error) => {
              console.error("Failed to cache response:", error);
            });

          return response;
        })
        .catch((error) => {
          console.error("Fetch failed:", error);
          // You could return a custom offline page here
          return new Response("Offline content not available");
        });
    })
  );
});
