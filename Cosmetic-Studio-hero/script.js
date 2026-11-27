const translations = {};
let currentLang = localStorage.getItem('eurelia_cosmetic_hero_lang') || 'en';

async function setLang(lang) {
  if (!['en', 'es', 'hu'].includes(lang)) lang = 'en';
  if (!translations[lang]) {
    const response = await fetch(`lang/${lang}.json`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Language file unavailable: ${lang}`);
    translations[lang] = await response.json();
  }
  const words = translations[lang];
  document.documentElement.lang = lang;
  document.title = words.meta_title || document.title;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (Object.prototype.hasOwnProperty.call(words, key)) {
      element.textContent = words[key];
    }
  });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  currentLang = lang;
  localStorage.setItem('eurelia_cosmetic_hero_lang', lang);
}

document.querySelectorAll('[data-lang]').forEach((button) => {
  button.addEventListener('click', () => setLang(button.dataset.lang).catch(console.error));
});

setLang(currentLang).catch(() => setLang('en'));
