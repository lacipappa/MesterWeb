const LANGS = ['hu', 'en', 'es'];
const requestedLanguage=new URLSearchParams(location.search).get('lang');
let currentLang = LANGS.includes(requestedLanguage)?requestedLanguage:/(?:^|\/)index\.html$|\/$/.test(location.pathname) ? 'es' : (localStorage.getItem('mesterweb_lang') || 'es');

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

function formRequest(form) {
  if (!form.reportValidity()) return null;
  const get = (id) => form.elements.namedItem(id);
  const choice = (id) => { const field = get(id); return field.options[field.selectedIndex]?.text || ''; };
  const t = {
    hu: { name:'Név', business:'Vállalkozás', email:'E-mail', project:'Kért szolgáltatás', website:'Jelenlegi weboldal', languages:'Nyelvek', message:'Üzenet' },
    en: { name:'Name', business:'Business', email:'Email', project:'Service requested', website:'Existing website', languages:'Languages', message:'Message' },
    es: { name:'Nombre', business:'Negocio', email:'Correo electrónico', project:'Servicio solicitado', website:'Web actual', languages:'Idiomas', message:'Mensaje' }
  };
  const l=t[currentLang] || t.es;
  const name=get('name').value.trim();
  const business=choice('business');
  const subject={hu:'Weboldal ajánlatkérés',en:'Website quote request',es:'Solicitud de presupuesto web'}[currentLang] || 'Solicitud de presupuesto web';
  const parts=[
    `${l.name}: ${name}`,
    `${l.email}: ${get('email').value.trim()}`,
    `${l.business}: ${business}`,
    `${l.project}: ${choice('project')}`,
    `${l.website}: ${get('website').value.trim() || '—'}`,
    `${l.languages}: ${choice('languages')}`,
    '', `${l.message}:`,get('message').value.trim()
  ];
  return {subject:`Laszlo-MesterWeb – ${subject} – ${business}`, body:parts.join('\n')};
}
function demoForm(event) {
  event.preventDefault();
  const request=formRequest(event.target);
  if (!request) return false;
  window.location.href=`mailto:mesterweb@lnkr.es?subject=${encodeURIComponent(request.subject)}&body=${encodeURIComponent(request.body)}`;
  return false;
}
function sendFormWhatsApp(form) {
  const request=formRequest(form);
  if (!request) return false;
  window.open(`https://wa.me/34634208657?text=${encodeURIComponent(request.subject+'\n\n'+request.body)}`, '_blank', 'noopener,noreferrer');
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => loadLanguage(button.dataset.lang));
  });

  loadLanguage(currentLang);
});

