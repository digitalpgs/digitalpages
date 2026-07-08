window.addEventListener("componentsLoaded", () => {
  const toggle = document.getElementById("theme-toggle");

  // Només actuem si el botó existeix a la navbar injectada
  if (toggle) {
    // Recuperem el tema desat de l'última vegada (si existeix)
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
      toggle.textContent = '☀️';
      toggle.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      toggle.textContent = '🌙';
      toggle.setAttribute('aria-label', 'Switch to light theme');
    }

    toggle.addEventListener("click", () => {
      // Canviem la classe al body
      document.body.classList.toggle("light-mode");

      // Desem la preferència de l'usuari i actualitzem la icona
      if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        toggle.textContent = '☀️';
        toggle.setAttribute('aria-label', 'Switch to dark theme');
      } else {
        localStorage.setItem("theme", "dark");
        toggle.textContent = '🌙';
        toggle.setAttribute('aria-label', 'Switch to light theme');
      }
    });
  }
});
