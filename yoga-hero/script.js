const buttons=[...document.querySelectorAll(".lang")];
const nav=document.querySelector(".header nav");
const menu=document.querySelector(".menu");
async function setLanguage(lang){
  try{
    const response=await fetch(`lang/${lang}.json`);
    if(!response.ok) throw new Error("Language file not found");
    const data=await response.json();
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const value=data[el.dataset.i18n];
      if(value!==undefined) el.textContent=value;
    });
    document.documentElement.lang=lang;
    localStorage.setItem("alma-tierra-lang",lang);
    buttons.forEach(button=>button.classList.toggle("active",button.dataset.lang===lang));
  }catch(error){console.error("Could not load language:",error);}
}
buttons.forEach(button=>button.addEventListener("click",()=>setLanguage(button.dataset.lang)));
menu?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menu.setAttribute("aria-expanded",String(open));
});
nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  nav.classList.remove("open");
  menu?.setAttribute("aria-expanded","false");
}));
document.querySelector("#year").textContent=new Date().getFullYear();
setLanguage(localStorage.getItem("alma-tierra-lang")||"es");