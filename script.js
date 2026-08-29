const LANGS = ['hu', 'en', 'es'];
let currentLang = localStorage.getItem('mesterweb_lang') || 'hu';

async function loadLanguage(lang) {
  if (!LANGS.includes(lang)) lang = 'hu';

  try {
    const response = await fetch(`lang/${lang}.json`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Language file not found');
    const t = await response.json();

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    document.documentElement.lang = lang;
    document.title = t.meta_title || document.title;

    document.querySelectorAll('[data-lang]').forEach((button) => {
      button.classList.toggle('active', button.dataset.lang === lang);
    });

    localStorage.setItem('mesterweb_lang', lang);
    currentLang = lang;
  } catch (error) {
    console.warn('Language loading failed:', error);
  }
}

function demoForm(event) {
  event.preventDefault();

  const messages = {
    hu: 'Köszönjük! Ez jelenleg egy bemutató űrlap. A végleges oldalon az üzenet e-mailre vagy űrlapszolgáltatásra köthető.',
    en: 'Thank you! This is currently a demo form. On the final website, the message can be connected to email or a form service.',
    es: '¡Gracias! Este es actualmente un formulario de demostración. En la web final, el mensaje puede conectarse al correo electrónico o a un servicio de formularios.'
  };

  alert(messages[currentLang] || messages.hu);
  event.target.reset();
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => loadLanguage(button.dataset.lang));
  });

  loadLanguage(currentLang);
});

