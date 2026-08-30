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

  const form = event.target;
  const name = form.name.value.trim();
  const business = form.business.options[form.business.selectedIndex]?.text || '';
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subjects = {
    hu: `MesterWeb érdeklődés – ${business}`,
    en: `MesterWeb enquiry – ${business}`,
    es: `Consulta MesterWeb – ${business}`
  };

  const labels = {
    hu: {name:'Név', business:'Vállalkozás', email:'E-mail', message:'Üzenet'},
    en: {name:'Name', business:'Business', email:'Email', message:'Message'},
    es: {name:'Nombre', business:'Negocio', email:'E-mail', message:'Mensaje'}
  };

  const l = labels[currentLang] || labels.hu;
  const body = [
    `${l.name}: ${name}`,
    `${l.business}: ${business}`,
    `${l.email}: ${email}`,
    '',
    `${l.message}:`,
    message
  ].join('\\n');

  window.location.href =
    `mailto:mesterweb@lnkr.es?subject=${encodeURIComponent(subjects[currentLang] || subjects.hu)}&body=${encodeURIComponent(body)}`;

  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => loadLanguage(button.dataset.lang));
  });

  loadLanguage(currentLang);
});
