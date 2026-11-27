const langButtons = [...document.querySelectorAll('[data-lang]')];
let languageRequest = 0;
async function setLanguage(lang) {
  const requestId = ++languageRequest;
  try {
    const response = await fetch(`lang/${lang}.json`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Could not load lang/${lang}.json`);
    const words = await response.json();
    if (requestId !== languageRequest) return;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(words, key)) {
        element.textContent = words[key];
      }
    });
    document.title = words.meta_title || document.title;
    document.documentElement.lang = lang;
    localStorage.setItem('nova-event-dj-hero-lang', lang);
    langButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.lang === lang);
    });
  } catch (error) {
    console.error('Language file could not be loaded:', error);
  }
}
langButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});
const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-toggle');
menuButton.addEventListener('click', () => {
  const opened = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(opened));
});
document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});
setLanguage(localStorage.getItem('nova-event-dj-hero-lang') || 'es');
