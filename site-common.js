(() => {
 const script=document.currentScript, root=new URL('.',script.src);
 const start=()=>{
  const header=document.querySelector('body > .fixed-shell, body > header, body > .topbar + header, main > header');
  if(header){
   header.classList.add('laszlo-fixed-header');
   for(const [name,value] of Object.entries({position:'fixed',top:'0',left:'0',right:'0',width:'100%',zIndex:'1000'})){header.style.setProperty(name==='zIndex'?'z-index':name,value,'important');}
   const sync=()=>{const h=Math.ceil(header.getBoundingClientRect().height);document.body.style.paddingTop=h+'px';document.documentElement.style.scrollPaddingTop=(h+20)+'px';};
   sync();new ResizeObserver(sync).observe(header);window.addEventListener('resize',sync);
  }
  const key=new URL(location.href).pathname.replace(new URL(root).pathname,'');
  const pages={
   'examples.html':['Examples','Ejemplos de páginas web personalizables para pequeños negocios.'],
   'digital-systems.html':['Digital systems','Programas propios para Windows: LaszloApartman y LaszloSaldo. También una demostración de CRM para empresas.'],
   'about.html':['About','Conoce a Laszlo y su trabajo: páginas web personalizadas y programas propios para Windows.'],
   'faq.html':['FAQ','Preguntas frecuentes sobre las páginas web, los programas para Windows y los servicios de Laszlo-MesterWeb.'],
   'why-mesterweb.html':['Why Laszlo-MesterWeb?','Webs personalizadas, atención directa y soluciones adaptadas a las necesidades de tu negocio.'],
   'website-trial.html':['Website trial','Descubre cómo funciona la prueba de 30 días de una página web personalizada.'],
   'landing-or-website.html':['Landing or website?','Elige una landing page o una web completa según los objetivos de tu negocio.'],
   'image-sources.html':['Image sources','Créditos y fuentes de las imágenes utilizadas en Laszlo-MesterWeb.']
  };
  if(pages[key]){
   const apply=()=>{document.title=pages[key][0]+' | Laszlo-MesterWeb';document.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]').forEach(e=>e.content=pages[key][1]);document.querySelectorAll('meta[property="og:title"],meta[name="twitter:title"]').forEach(e=>e.content=document.title);};
   apply();new MutationObserver(()=>queueMicrotask(apply)).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  // Carry the selected language into the two product presentation pages.
  document.addEventListener('click',event=>{const a=event.target.closest('a[href]');if(!a)return;const u=new URL(a.href);if(u.origin===location.origin && /\/(LaszloSaldo|LaszloApartman)\/$/.test(u.pathname)){u.searchParams.set('lang',document.documentElement.lang);a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';}});
 };
 document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
