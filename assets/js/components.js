async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`No s'ha pogut carregar: ${file}`);
    const html = await res.text();
    const element = document.getElementById(id);
    if (element) element.innerHTML = html;
  } catch (err) {
    console.error(err);
  }
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

  // DISPATXA L'ESDEVENIMENT QUANT TOT ESTÀ INJECTAT
  window.dispatchEvent(new Event("componentsLoaded"));
}

document.addEventListener("DOMContentLoaded", initComponents);
