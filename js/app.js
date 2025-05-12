// Main app JavaScript file

// Check if the app is running in standalone mode (installed as PWA)
function isPWAInstalled() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true ||
    document.referrer.includes("android-app://")
  );
}

// Initialize the app
function initApp() {
  // Add mobile menu toggle functionality
  const header = document.querySelector(".header");
  if (header) {
    const mobileMenuButton = document.createElement("button");
    mobileMenuButton.className = "mobile-menu-button";
    mobileMenuButton.innerHTML = "☰";
    mobileMenuButton.style.display = "none";

    // Only show on mobile
    if (window.innerWidth < 768) {
      mobileMenuButton.style.display = "block";

      // Add to DOM
      const logoContainer = header.querySelector(".logo-container");
      if (logoContainer) {
        logoContainer.parentNode.insertBefore(
          mobileMenuButton,
          logoContainer.nextSibling
        );
      }

      // Toggle menu on click
      mobileMenuButton.addEventListener("click", () => {
        const nav = header.querySelector(".main-nav");
        if (nav) {
          nav.style.display = nav.style.display === "flex" ? "none" : "flex";
        }
      });
    }
  }

  // If the app is installed, we can add some special functionality
  if (isPWAInstalled()) {
    console.log("App is running as installed PWA");
    // You could add special functionality for installed app here
    document.body.classList.add("pwa-installed");
  }
}

// Register service worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Use relative path for service worker
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", initApp);
