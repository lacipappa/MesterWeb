const translations = {};
let currentLang = localStorage.getItem('lumea_lang') || 'es';

async function setLang(lang) {
  if (!translations[lang]) {
    const response = await fetch(`lang/${lang}.json`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Could not load ${lang} language file`);
    translations[lang] = await response.json();
  }
  const words = translations[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (Object.prototype.hasOwnProperty.call(words, key)) element.textContent = words[key];
  });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  localStorage.setItem('lumea_lang', lang);
  currentLang = lang;
}

document.querySelectorAll('[data-lang]').forEach((button) => {
  button.addEventListener('click', () => setLang(button.dataset.lang).catch(console.error));
});
setLang(currentLang).catch(() => setLang('es'));
