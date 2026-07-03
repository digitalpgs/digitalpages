const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.querySelector("input[type='text']").value;
  const email = form.querySelector("input[type='email']").value;
  const message = form.querySelector("textarea").value;

  alert("Message sent! I will reply soon 💜");

  form.reset();
});