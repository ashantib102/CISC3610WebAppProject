// PWA installation functionality
document.addEventListener("DOMContentLoaded", () => {
  let deferredPrompt;
  const installButton = document.getElementById("install-button");

  // Initialize button
  if (installButton) {
    installButton.style.removeProperty("display");
  }

  // Check if the app is already installed
  if (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true ||
    document.referrer.includes("android-app://")
  ) {
    if (installButton) {
      installButton.textContent = "✓ Installed";
      installButton.disabled = true;
    }
    return;
  }

  // Listen for the beforeinstallprompt event
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;

    if (installButton) {
      installButton.textContent = "Install App ↓";
      installButton.disabled = false;

      // Add click handler for install button
      installButton.addEventListener("click", async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        if (outcome === "accepted") {
          installButton.textContent = "✓ Installed";
          installButton.disabled = true;
        }

        // We've used the prompt, and can't use it again
        deferredPrompt = null;
      });
    }
  });

  // Listen for the appinstalled event
  window.addEventListener("appinstalled", (e) => {
    console.log("PWA was installed");
    if (installButton) {
      installButton.textContent = "✓ Installed";
      installButton.disabled = true;
    }
  });
});
