async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function initComponents() {
  await loadComponent("navbar", "components/navbar.html");
  await loadComponent("hero", "components/hero.html");
  await loadComponent("services", "components/services.html");
  await loadComponent("about", "components/about.html");
  await loadComponent("portfolio", "components/portfolio.html");
  await loadComponent("faq", "components/faq.html");
  await loadComponent("contact", "components/contact.html");
  await loadComponent("footer", "components/footer.html");
}

initComponents();