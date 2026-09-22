const state={lang:'es'};
const buttons=[...document.querySelectorAll('.lang')];
async function setLanguage(lang){
  try{
    const response=await fetch(`lang/${lang}.json`);
    if(!response.ok)throw new Error('Language file not found');
    const data=await response.json();
    document.querySelectorAll('[data-i18n]').forEach(el=>{const value=data[el.dataset.i18n];if(value)el.childNodes[0].nodeValue=value});
    document.documentElement.lang=lang;state.lang=lang;localStorage.setItem('carpinteria-lang',lang);
    buttons.forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===lang));
  }catch(error){console.error(error)}
}
buttons.forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.main-nav');
menuButton.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
document.getElementById('year').textContent=new Date().getFullYear();
setLanguage(localStorage.getItem('carpinteria-lang')||'es');
