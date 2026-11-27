const translations = {};
let current = localStorage.getItem('costaluz_apartman_hero_lang') || 'es';

async function setLang(lang) {
  if (!['es', 'en', 'hu'].includes(lang)) lang = 'es';
  if (!translations[lang]) {
    try {
      const response = await fetch(`lang/${lang}.json`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Language file unavailable: ${lang}`);
      translations[lang] = await response.json();
    } catch (error) {
      console.error(error);
      return;
    }
  }

  const words = translations[lang];
  document.documentElement.lang = lang;
  document.title = words.meta_title || document.title;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (words[key] !== undefined) element.textContent = words[key];
  });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  current = lang;
  localStorage.setItem('costaluz_apartman_hero_lang', lang);
}

document.querySelectorAll('[data-lang]').forEach((button) => {
  button.addEventListener('click', () => setLang(button.dataset.lang));
});
setLang(current);
