const LANGS = ['hu', 'en', 'es'];
let currentLang = localStorage.getItem('mesterfix_lang') || 'hu';

async function loadLanguage(lang) {
  if (!LANGS.includes(lang)) lang = 'hu';
  try {
    const response = await fetch(`lang/${lang}.json`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Language file not found');
    const translations = await response.json();

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (translations[key] !== undefined) el.textContent = translations[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (translations[key] !== undefined) el.placeholder = translations[key];
    });

    document.documentElement.lang = lang;
    document.title = translations.meta_title || document.title;
    document.querySelectorAll('[data-lang]').forEach((button) => {
      button.classList.toggle('active', button.dataset.lang === lang);
    });
    localStorage.setItem('mesterfix_lang', lang);
    currentLang = lang;
  } catch (error) {
    console.warn('Language loading failed:', error);
    if (lang !== 'hu') {
      alert('A nyelvi fájl nem tölthető be. Ellenőrizd, hogy a lang mappa és a JSON fájlok is felkerültek-e a tárhelyre.');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => loadLanguage(button.dataset.lang));
  });
  loadLanguage(currentLang);
});

function demoForm(event) {
  event.preventDefault();
  const messages = {
    hu: 'Köszönjük! Ez egy bemutató űrlap. A végleges oldalon az üzenet e-mailre vagy CRM rendszerbe küldhető.',
    en: 'Thank you! This is a demo form. On the final website, the message can be connected to email or a CRM system.',
    es: '¡Gracias! Este es un formulario de demostración. En la web final, el mensaje puede conectarse al correo electrónico o a un CRM.'
  };
  alert(messages[currentLang] || messages.hu);
  event.target.reset();
  return false;
}
