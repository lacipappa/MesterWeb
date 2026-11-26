const translations = {};
let current = localStorage.getItem('aquafix_lang') || 'es';

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
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    if (words[key] !== undefined) element.textContent = words[key];
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const key = element.dataset.i18nAria;
    if (words[key] !== undefined) element.setAttribute('aria-label', words[key]);
  });
  document.querySelectorAll('[data-lang]').forEach(button => {
    button.classList.toggle('active', button.dataset.lang === lang);
    button.setAttribute('aria-pressed', button.dataset.lang === lang ? 'true' : 'false');
  });
  current = lang;
  localStorage.setItem('aquafix_lang', lang);
}

document.querySelectorAll('[data-lang]').forEach(button => {
  button.addEventListener('click', () => setLang(button.dataset.lang));
});

const range = document.getElementById('compareRange');
const before = document.getElementById('compareBefore');
const line = document.getElementById('compareLine');
function updateCompare() {
  if (!range || !before || !line) return;
  const value = Math.max(0, Math.min(100, Number(range.value)));
  before.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
  line.style.left = `${value}%`;
  range.setAttribute('aria-valuetext', `${value}%`);
}
if (range) {
  range.addEventListener('input', updateCompare);
  range.addEventListener('change', updateCompare);
  updateCompare();
}
setLang(current);
