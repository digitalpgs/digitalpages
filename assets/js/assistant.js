window.addEventListener('componentsLoaded', async () => {
  const toggle = document.getElementById('assistantToggle');
  const chat = document.getElementById('assistantChat');
  const messagesEl = document.getElementById('assistantMessages');
  const input = document.getElementById('assistantInput');
  const sendBtn = document.getElementById('assistantSend');
  const closeBtn = document.getElementById('assistantCloseBtn');
  const actionsEl = document.getElementById('assistantActions');

  if (!toggle || !chat || !closeBtn) return;

  const STORAGE_KEY = 'digi_chat_history';

  function loadHistory() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveHistory(list) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  let history = [];
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}

  history = loadHistory();
  if (history.length) {
    history = [];
    saveHistory(history);
  }

  function renderMessages() {
    if (!messagesEl) return;
    messagesEl.innerHTML = '';
    history.forEach(msg => {
      const div = document.createElement('div');
      div.className = 'msg ' + (msg.role === 'user' ? 'user' : 'bot');
      div.textContent = msg.text;
      messagesEl.appendChild(div);
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addMessage(role, text) {
    history.push({ role, text, ts: Date.now() });
    saveHistory(history);
    renderMessages();
  }

  function showChat() { chat.classList.add('show'); chat.setAttribute('aria-hidden','false'); }
  function hideChat() { chat.classList.remove('show'); chat.setAttribute('aria-hidden','true'); }

  async function getTranslationDict() {
    const lang = document.documentElement.lang || 'en';
    if (typeof window.loadLanguageFile === 'function') {
      return await window.loadLanguageFile(lang);
    }
    return {};
  }

  async function getReply(key, fallback) {
    const dict = await getTranslationDict();
    const translation = (typeof window.getTranslation === 'function' && dict) ? window.getTranslation(dict, `assistant.${key}`) : null;
    return translation || fallback;
  }

  async function botReply(text) {
    const t = text.toLowerCase();
    if (/hello|hi|hey|hola|bona|bon dia|bona tarda/.test(t)) return await getReply('help', "Hi! I'm Digi — how can I help you today?");
    if (/services|servicios|serveis|what i do|what do you do|offer/.test(t)) return await getReply('services', "I can help with web development, AI solutions, automation, UI/UX and video editing. Want to see examples?");
    if (/portfolio|work|projects|trabajo|proyectos|projectes/.test(t)) return await getReply('portfolio', "You can find projects in the Work section. Would you like me to scroll there?");
    if (/contact|talk|hire|quote|contacto|contacte|parlem|saludar/.test(t)) return await getReply('contact', "I can open the contact form for you — shall I?");
    if (/price|pricing|cost|precio|coste|preu|tarifa/.test(t)) return await getReply('pricing', "Pricing depends on scope. Tell me the project type and I can give a rough estimate.");
    if (/process|workflow|how do you work|steps|timeline|proceso|procés|flux/.test(t)) return await getReply('process', "I work by understanding your goals, designing a clean concept, building a responsive experience, and refining it until your site is launch-ready.");
    if (/design|ui|ux|interface|layout|branding|diseño|disseny|interfície/.test(t)) return await getReply('design', "I create user-focused interfaces, strong brand messaging, and layouts that guide visitors toward your goals.");
    if (/automation|ai|chatbot|integration|workflow|tools|automatización|automatització|integración|integració/.test(t)) return await getReply('automation', "I can automate workflows, implement AI-enhanced features, and connect your website with the tools that save you time.");
    if (/technology|tech|tools|stack|framework|tecnología|tecnologia|eines|herramientas/.test(t)) return await getReply('tech', "I use modern web tools and clean code to build fast, accessible, mobile-first websites that align with your brand.");
    if (/maintenance|support|update|changes|mantenimiento|soporte|actualización|actualització/.test(t)) return await getReply('maintenance', "After launch, I can support updates, content changes, performance checks, and ongoing improvements.");
    if (/why|choose|best|trusted|differences|por qué|porque|per què|millor|triar/.test(t)) return await getReply('why_choose', "I combine modern design, technical efficiency and a professional process to deliver websites and automation that help your business grow.");
    if (/best practice|recommend|strategy|advice|recomend|recomanat|estratègia/.test(t)) return await getReply('best_practice', "My recommended approach is mobile-first design, fast loading, clear calls-to-action, and consistent brand styling.");
    if (/build|website|site|page|launch|sitio|web|llançament|lanzamiento/.test(t)) return await getReply('build_site', "Yes, I can create a website for your business. Tell me the main goal, audience and features you need, and I’ll suggest the best plan.");
    if (/thanks|thank you|gracias|gràcies/.test(t)) return await getReply('thanks', "You're welcome! Anything else I can help with?");
    if (/language|idioma|idiom|idioma|idioma/.test(t)) return await getReply('language', "Use the language selector in the navbar to change languages.");
    return await getReply('unknown', "Sorry, I didn't catch that. You can ask about services, process, design, automation, or say 'contact' to open the form.");
  }

  function deduceReplyKey(text) {
    const t = text.toLowerCase();
    if (/hello|hi|hey|hola|bona|bon dia|bona tarda/.test(t)) return 'help';
    if (/services|servicios|serveis|what i do|what do you do|offer/.test(t)) return 'services';
    if (/portfolio|work|projects|trabajo|proyectos|projectes/.test(t)) return 'portfolio';
    if (/contact|talk|hire|quote|contacto|contacte|parlem|saludar/.test(t)) return 'contact';
    if (/price|pricing|cost|precio|coste|preu|tarifa/.test(t)) return 'pricing';
    if (/process|workflow|how do you work|steps|timeline|proceso|procés|flux/.test(t)) return 'process';
    if (/design|ui|ux|interface|layout|branding|diseño|disseny|interfície/.test(t)) return 'design';
    if (/automation|ai|chatbot|integration|workflow|tools|automatización|automatització|integración|integració/.test(t)) return 'automation';
    if (/technology|tech|tools|stack|framework|tecnología|tecnologia|eines|herramientas/.test(t)) return 'tech';
    if (/maintenance|support|update|changes|mantenimiento|soporte|actualización|actualització/.test(t)) return 'maintenance';
    if (/why|choose|best|trusted|differences|por qué|porque|per què|millor|triar/.test(t)) return 'why_choose';
    if (/best practice|recommend|strategy|advice|recomend|recomanat|estratègia/.test(t)) return 'best_practice';
    if (/build|website|site|page|launch|sitio|web|llançament|lanzamiento/.test(t)) return 'build_site';
    if (/thanks|thank you|gracias|gràcies/.test(t)) return 'thanks';
    if (/language|idioma|idiom|idioma|idioma/.test(t)) return 'language';
    return 'unknown';
  }

  async function renderActions() {
    if (!actionsEl) return;
    const keys = ['quick_services', 'quick_process', 'quick_design', 'quick_automation', 'quick_contact'];
    actionsEl.innerHTML = '';
    const dict = await getTranslationDict();

    keys.forEach(key => {
      const label = (typeof window.getTranslation === 'function' && dict) ? window.getTranslation(dict, `assistant.${key}`) : null;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'assistant-action';
      button.textContent = label || key.replace('quick_', '').replace('_', ' ');
      button.addEventListener('click', () => {
        const actionText = {
          quick_services: 'Tell me about your services',
          quick_process: 'How does your process work?',
          quick_design: 'Explain your design approach',
          quick_automation: 'How can you automate my business?',
          quick_contact: 'I want to contact you'
        }[key];
        handleUser(actionText);
      });
      actionsEl.appendChild(button);
    });
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'msg bot typing';
    typing.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return typing;
  }

  async function handleUser(text) {
    if (!text || !text.trim()) return;
    addMessage('user', text.trim());
    input.value = '';

    const typingEl = showTyping();
    const reply = await botReply(text);
    typingEl.remove();
    addMessage('bot', reply);

    if (/portfolio|work|projects|trabajo|proyectos|projectes/.test(text.toLowerCase())) {
      const openWorkText = await getReply('open_work', 'Click here to go to Work.');
      if (openWorkText) addMessage('bot', openWorkText);
    }

    if (/contact|talk|hire|quote|contacto|contacte|parlem|saludar/.test(text.toLowerCase())) {
      setTimeout(() => {
        const contact = document.getElementById('contact');
        if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }

    renderActions();
  }

  toggle.addEventListener('click', () => {
    if (chat.classList.contains('show')) hideChat(); else { showChat(); renderMessages(); }
  });

  sendBtn.addEventListener('click', () => handleUser(input.value));
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); handleUser(input.value); } });
  closeBtn.addEventListener('click', () => hideChat());

  renderMessages();
  await renderActions();
  window.addEventListener('languageChanged', async () => {
    await renderActions();
  });
});
