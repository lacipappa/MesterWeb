const languageButtons = [...document.querySelectorAll('.lang')];
async function setLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    if (!response.ok) throw new Error(`Could not load ${lang}.json`);
    const words = await response.json();
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(words, key)) {
        element.textContent = words[key];
      }
    });
    document.title = words.pageTitle || document.title;
    document.documentElement.lang = lang;
    localStorage.setItem('aura-cobre-hero-language', lang);
    languageButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.lang === lang);
    });
  } catch (error) {
    console.error('Language file could not be loaded:', error);
  }
}
languageButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});
document.getElementById('year').textContent = new Date().getFullYear();
setLanguage(localStorage.getItem('aura-cobre-hero-language') || 'es');
