const langButtons=[...document.querySelectorAll('[data-lang]')];
let langSeq=0;
async function setLanguage(lang){
 const seq=++langSeq;
 try{
  const response=await fetch(`lang/${lang}.json`,{cache:"no-store"});
  if(!response.ok)throw new Error("Language file unavailable");
  const data=await response.json();
  if(seq!==langSeq)return;
  document.querySelectorAll("[data-i18n]").forEach(el=>{const value=data[el.dataset.i18n];if(value!==undefined)el.textContent=value});
  document.documentElement.lang=lang;
  localStorage.setItem("nova-events-lang",lang);
  langButtons.forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
 }catch(error){console.error(error)}
}
langButtons.forEach(b=>b.addEventListener("click",()=>setLanguage(b.dataset.lang)));
const header=document.querySelector(".site-header"),toggle=document.querySelector(".menu-toggle");
toggle.addEventListener("click",()=>{const open=header.classList.toggle("menu-open");toggle.setAttribute("aria-expanded",String(open))});
document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>{header.classList.remove("menu-open");toggle.setAttribute("aria-expanded","false")}));
setLanguage(localStorage.getItem("nova-events-lang")||"hu");
