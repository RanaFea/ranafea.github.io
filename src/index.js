import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";
import { substituteFrogImage } from "./scripts/imageReplace";
import newFrogImage from "./assets/frogAIDrawing.png";

initScrollReveal(targetElements, defaultProps);
initTiltEffect();

document.addEventListener("DOMContentLoaded", () => {
  const aboutImage = document
    .getElementById("about-image")
    .querySelector("img");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          substituteFrogImage(entry.target, newFrogImage);
          observer.unobserve(entry.target); // Stop observing after the animation triggers
        }
      });
    },
    { threshold: 0.5 }
  ); // Adjust threshold as needed for visibility

  observer.observe(aboutImage);
});
