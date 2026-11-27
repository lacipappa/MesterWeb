const translations = {};
let current = localStorage.getItem('costaluz_apartman_hero_lang') || 'es';
async function setLang(lang) {
  if (!['es','en','hu'].includes(lang)) lang='es';
  if (!translations[lang]) {
    try { const response=await fetch(`lang/${lang}.json`,{cache:'no-store'}); if(!response.ok) throw new Error(`Language file unavailable: ${lang}`); translations[lang]=await response.json(); }
    catch(error){ console.error(error); return; }
  }
  const words=translations[lang]; document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(words[key]!==undefined)el.textContent=words[key];});
  document.querySelectorAll('[data-lang]').forEach(btn=>{btn.classList.toggle('active',btn.dataset.lang===lang);btn.setAttribute('aria-pressed',btn.dataset.lang===lang?'true':'false');});
  current=lang; localStorage.setItem('costaluz_apartman_hero_lang',lang);
}
document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setLang(btn.dataset.lang)));
setLang(current);
