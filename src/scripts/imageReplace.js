export function substituteFrogImage(
  imageElement,
  newImageSrc,
  fadeOutDuration = 1000,
  delay = 3000
) {
  if (!imageElement) return;

  console.log("Initial Image Source:", imageElement.src); // Log current source

  // Preload the new image
  const img = new Image();
  img.src = newImageSrc;
  img.onload = () => {
    console.log("New image preloaded");

    // Add sparkles effect container
    const wrapper = imageElement.closest(".image-wrapper");
    const magicEffect = document.createElement("div");
    magicEffect.className = "magic-effect";

    for (let i = 0; i < 10; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      magicEffect.appendChild(sparkle);
    }

    wrapper.appendChild(magicEffect);

    // Show sparkles 1 second before fade-out
    setTimeout(() => {
      wrapper.classList.add("active"); // Show sparkles
    }, delay - 1000);

    setTimeout(() => {
      imageElement.classList.add("hidden"); // Fade out the current image
      console.log("Changing Image...");

      setTimeout(() => {
        imageElement.src = newImageSrc; // Change to the new image
        console.log("New Image Source:", imageElement.src); // Log new source
        imageElement.classList.remove("hidden"); // Fade in the new image

        // Keep sparkles for 1 second after fade-in
        setTimeout(() => {
          wrapper.classList.remove("active"); // Hide sparkles
          magicEffect.remove(); // Cleanup
        }, fadeOutDuration + 1000);
      }, fadeOutDuration); // Matches the CSS transition duration
    }, delay); // Delay for demonstration
  };

  img.onerror = (e) => {
    console.error("Failed to preload the new image", e, newImageSrc);
  };
}
