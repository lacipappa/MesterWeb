const buttons=[...document.querySelectorAll('.lang')];
async function setLanguage(lang){
  try{
    const response=await fetch(`lang/${lang}.json`);
    if(!response.ok) throw new Error('Language file not found');
    const data=await response.json();
    document.querySelectorAll('[data-i18n]').forEach(element=>{
      const key=element.dataset.i18n;
      if(data[key]!==undefined) element.textContent=data[key];
    });
    document.documentElement.lang=lang;
    localStorage.setItem('miga-sol-hero-lang',lang);
    buttons.forEach(button=>button.classList.toggle('active',button.dataset.lang===lang));
  }catch(error){console.error('Language loading error:',error);}
}
buttons.forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
menu.addEventListener('click',()=>{
  const opened=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(opened));
});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');menu.setAttribute('aria-expanded','false');
}));
document.getElementById('year').textContent=new Date().getFullYear();
setLanguage(localStorage.getItem('miga-sol-hero-lang')||'es');
