const supportedLanguages = ["en", "es", "ca"];
const defaultLanguage = "en";
const translationCache = {};

function getSavedLanguage() {
  const saved = localStorage.getItem("dp-language");
  return supportedLanguages.includes(saved) ? saved : null;
}

function saveLanguage(lang) {
  if (supportedLanguages.includes(lang)) {
    localStorage.setItem("dp-language", lang);
  }
}

function getCurrentLanguage() {
  return getSavedLanguage() || defaultLanguage;
}

function translateDocument(dictionary) {
  if (!dictionary) return;

  // 1. Textos Normals
  const textNodes = document.querySelectorAll("[data-i18n]");
  textNodes.forEach((node) => {
    try {
      if (node.hasAttribute("data-i18n-attr")) return; // Deixem que ho faci el bloc d'atributs
      const key = node.getAttribute("data-i18n");
      if (!key || key.trim() === "") return;
      const value = getTranslation(dictionary, key);
      if (value !== undefined) node.textContent = normalizeApostrophes(value);
    } catch (e) { console.error("Error data-i18n:", e); }
  });

  // 2. Placeholders
  const placeholderNodes = document.querySelectorAll("[data-i18n-placeholder]");
  placeholderNodes.forEach((node) => {
    try {
      const key = node.getAttribute("data-i18n-placeholder");
      if (!key || key.trim() === "") return;
      const value = getTranslation(dictionary, key);
      if (value !== undefined) node.placeholder = normalizeApostrophes(value);
    } catch (e) { console.error("Error data-i18n-placeholder:", e); }
  });

  // 3. Atributs (com alt, title, etc.)
  const attrNodes = document.querySelectorAll("[data-i18n-attr]");
  attrNodes.forEach((node) => {
    try {
      const attrName = node.getAttribute("data-i18n-attr");
      const key = node.getAttribute("data-i18n") || attrName;
      if (!key || !attrName || key.trim() === "") return;
      const value = getTranslation(dictionary, key);
      if (value !== undefined) node.setAttribute(attrName, normalizeApostrophes(value));
    } catch (e) { console.error("Error data-i18n-attr:", e); }
  });
}

function normalizeApostrophes(input) {
  if (typeof input !== 'string') return input;
  return input.replace(/[\u2018\u2019\u201A\u201B\u2032\u02BC`\uFFFD]|\u00e2\u0080\u0099/g, "'");
}

function getTranslation(dictionary, key) {
  if (!dictionary || !key) return undefined;
  return key.split(".").reduce((obj, part) => {
    if (obj && typeof obj === "object" && part in obj) {
      return obj[part];
    }
    return undefined;
  }, dictionary);
}

async function loadLanguageFile(lang) {
  if (translationCache[lang]) return translationCache[lang];
  try {
    const response = await fetch(`languages/${lang}.json`);
    if (!response.ok) throw new Error(`Failed to load language file: ${lang}`);
    const dictionary = await response.json();
    translationCache[lang] = dictionary;
    return dictionary;
  } catch (error) {
    console.error(error);
    return {};
  }
}

async function setLanguage(lang) {
  const language = supportedLanguages.includes(lang) ? lang : defaultLanguage;
  saveLanguage(language);
  const dictionary = await loadLanguageFile(language);
  translateDocument(dictionary);
  updateLanguageSelector(language);
  document.documentElement.lang = language;
  window.dispatchEvent(new Event('languageChanged'));
}

function updateLanguageSelector(lang) {
  const selector = document.getElementById("language-select");
  if (selector) selector.value = lang;
}

function setupLanguageSwitcher() {
  const selector = document.getElementById("language-select");
  if (!selector) return;
  selector.addEventListener("change", async (event) => {
    const newLang = event.target.value;
    await setLanguage(newLang);
  });
}

// Exposició de mètodes a l'objecte window perquè el xat els pugui llegir de forma segura
window.getCurrentLanguage = getCurrentLanguage;
window.loadLanguageFile = loadLanguageFile;
window.getTranslation = getTranslation;

window.addEventListener("componentsLoaded", async () => {
  setupLanguageSwitcher();
  const currentLanguage = getCurrentLanguage();
  await setLanguage(currentLanguage);
});
