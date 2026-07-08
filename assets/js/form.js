window.addEventListener("componentsLoaded", () => {
  const form = document.getElementById("contactForm");

  // Seguretat per si de cas el formulari triga una fracció de segon més a estar llest
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("input[type='text']").value;
    const email = form.querySelector("input[type='email']").value;
    const message = form.querySelector("textarea").value;

    alert("Message sent! I will reply soon 💜");

    form.reset();
  });
});
