window.addEventListener("componentsLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Seguretat: només actua si realment s'han trobat els elements
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});
