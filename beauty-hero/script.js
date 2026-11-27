const translations = {};
let currentLang = localStorage.getItem('lumea_lang') || 'es';

async function setLang(lang) {
  if (!['es', 'en', 'hu'].includes(lang)) lang = 'es';

  if (!translations[lang]) {
    const response = await fetch(`lang/${lang}.json`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Could not load ${lang} language file`);
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

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (Object.prototype.hasOwnProperty.call(words, key)) {
      element.setAttribute('placeholder', words[key]);
    }
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    const key = element.dataset.i18nAria;
    if (Object.prototype.hasOwnProperty.call(words, key)) {
      element.setAttribute('aria-label', words[key]);
    }
  });

  document.querySelectorAll('[data-lang]').forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  currentLang = lang;
  localStorage.setItem('lumea_lang', lang);
}

document.querySelectorAll('[data-lang]').forEach((button) => {
  button.addEventListener('click', () => setLang(button.dataset.lang).catch(console.error));
});

const topbar = document.querySelector('.topbar');
const navToggle = document.querySelector('.menu-toggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const opened = topbar.classList.toggle('menu-open');
    navToggle.setAttribute('aria-expanded', String(opened));
  });
}
document.querySelectorAll('.nav nav a').forEach((link) => {
  link.addEventListener('click', () => {
    topbar.classList.remove('menu-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  });
});

const bookingForm = document.getElementById('bookingForm');
const formStatus = document.getElementById('formStatus');
if (bookingForm && formStatus) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const words = translations[currentLang] || {};
    formStatus.textContent = words.form_success || 'This is a demonstration form. No request has been sent.';
    bookingForm.reset();
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

setLang(currentLang).catch(() => setLang('es'));
