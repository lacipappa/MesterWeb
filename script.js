const LANGS = ['hu', 'en', 'es'];
const requestedLanguage=new URLSearchParams(location.search).get('lang');
let currentLang = LANGS.includes(requestedLanguage)?requestedLanguage:/(?:^|\/)index\.html$|\/$/.test(location.pathname) ? 'es' : (localStorage.getItem('mesterweb_lang') || 'es');

const digitalSystemsLabel = {
  hu: 'Digitális rendszerek',
  en: 'Digital systems',
  es: 'Sistemas digitales'
};

let languageRequest = 0;
async function loadLanguage(lang) {
  const requestId = ++languageRequest;
  if (!LANGS.includes(lang)) lang = 'es';

  try {
    const response = await fetch(`lang/${lang}.json?v=20261025-seo`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Language file not found');
    const t = await response.json();
    if (requestId !== languageRequest) return;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n="nav_crm"]').forEach((el) => {
      el.textContent = digitalSystemsLabel[lang];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    document.documentElement.lang = lang;
    if (window.applyPageSEO) { window.applyPageSEO(lang); } else {
    if (!location.pathname.endsWith('examples.html')) document.title = t.meta_title || document.title;
    for (const selector of ['meta[name="description"]','meta[property="og:description"]','meta[name="twitter:description"]']) { const el=document.querySelector(selector); if(el && t.meta_description) el.content=t.meta_description; }
    for (const selector of ['meta[property="og:title"]','meta[name="twitter:title"]']) { const el=document.querySelector(selector); if(el) el.content=document.title; }

    }

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
    hu: `Laszlo-MesterWeb érdeklődés – ${business}`,
    en: `Laszlo-MesterWeb enquiry – ${business}`,
    es: `Consulta Laszlo-MesterWeb – ${business}`
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
  ].join('\n');

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

