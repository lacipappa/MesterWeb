const cache={};let current=localStorage.getItem("lumea_lang")||"hu";
async function setLang(lang){
  if(!["hu","en","es"].includes(lang)) lang="hu";
  if(!cache[lang]){
    const r=await fetch(`lang/${lang}.json`,{cache:"no-store"});
    cache[lang]=await r.json();
  }
  const t=cache[lang];
  document.documentElement.lang=lang;
  if(t.meta_title) document.title=t.meta_title;
  document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(t[k]!==undefined)el.textContent=t[k]});
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{const k=el.dataset.i18nPlaceholder;if(t[k]!==undefined)el.placeholder=t[k]});
  document.querySelectorAll("[data-lang]").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
  localStorage.setItem("lumea_lang",lang);current=lang;
}
document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
const form=document.getElementById("bookingForm");
if(form) form.addEventListener("submit",e=>{e.preventDefault();alert((cache[current]||{}).form_success||"Demo: the appointment request would be sent here.")});
setLang(current);
