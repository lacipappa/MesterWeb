const buttons=[...document.querySelectorAll('[data-lang]')];
async function setLanguage(lang){
  try{
    const response=await fetch(`lang/${lang}.json`);
    if(!response.ok) throw new Error('Language file not found');
    const data=await response.json();
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key=el.dataset.i18n;
      if(data[key]!==undefined) el.textContent=data[key];
    });
    document.title=data.pageTitle||document.title;
    document.documentElement.lang=lang;
    localStorage.setItem('jardineria-hero-lang',lang);
    buttons.forEach(button=>button.classList.toggle('active',button.dataset.lang===lang));
  }catch(error){console.error('Language loading error:',error);}
}
buttons.forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');
menu.addEventListener('click',()=>{
  const opened=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(opened));
});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');menu.setAttribute('aria-expanded','false');
}));
document.getElementById('year').textContent=new Date().getFullYear();
setLanguage(localStorage.getItem('jardineria-hero-lang')||'es');
