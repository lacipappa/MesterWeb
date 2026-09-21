const cache={};let current=localStorage.getItem("torq_lang")||"hu";
async function setLang(lang){
  if(!cache[lang]){const r=await fetch(`lang/${lang}.json`,{cache:"no-store"});cache[lang]=await r.json();}
  const t=cache[lang];document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(t[k]!==undefined)el.textContent=t[k]});
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{const k=el.dataset.i18nPlaceholder;if(t[k]!==undefined)el.placeholder=t[k]});
  document.querySelectorAll("[data-lang]").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
  localStorage.setItem("torq_lang",lang);current=lang;
}
document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
document.getElementById("quoteForm").addEventListener("submit",e=>{e.preventDefault();alert((cache[current]||{}).form_success||"Demo: az üzenet itt kerülne elküldésre.")});
setLang(current);
