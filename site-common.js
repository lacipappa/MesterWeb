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
   const apply=()=>{const ds={hu:['Digitális rendszerek','LaszloSaldo, LaszloApartman és Laszlo Nyelvtanuló: saját Windows-programok. A Nyelvtanuló csak magyar felületű, spanyol–magyar tanuláshoz.'],en:['Digital systems','LaszloSaldo, LaszloApartman and Laszlo Nyelvtanuló: Windows applications. Nyelvtanuló has a Hungarian-only interface for Spanish–Hungarian learning.'],es:['Sistemas digitales','LaszloSaldo, LaszloApartman y Laszlo Nyelvtanuló: programas para Windows. Nyelvtanuló tiene interfaz solo en húngaro para aprender español–húngaro.']};const selected=key==='digital-systems.html'?(ds[document.documentElement.lang]||ds.es):pages[key];document.title=selected[0]+' | Laszlo-MesterWeb';document.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]').forEach(e=>e.content=selected[1]);document.querySelectorAll('meta[property="og:title"],meta[name="twitter:title"]').forEach(e=>e.content=document.title);};
   apply();new MutationObserver(()=>queueMicrotask(apply)).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  // Carry the selected language into the two product presentation pages.
  document.addEventListener('click',event=>{const a=event.target.closest('a[href]');if(!a)return;const u=new URL(a.href);if(document.body.hasAttribute('data-laszlo-main') && u.origin===location.origin && /\/(LaszloSaldo|LaszloApartman|LaszloNyelv)\/$/.test(u.pathname)){u.searchParams.set('lang',document.documentElement.lang);a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';}});
 };
 document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();

// Persistent product shortcuts on Laszlo-MesterWeb pages and product presentations.
// Customer demonstration websites deliberately keep their own branding.
(() => {
 'use strict';
 const source=document.currentScript,base=new URL('.',source.src);
 const strings={
  hu:{title:'Windows-programok',line:'Rendszerezz. Tanulj. Könnyíts a napodon.',open:'Programok megnyitása',close:'Programmenü összecsukása',saldo:'Tudd, mire megy el a család pénze.',apartman:'Készülj fel a következő vendégre.',nyelv:'Tanulj spanyolul a saját tempódban.',only:'Csak magyar felület · spanyol–magyar'},
  en:{title:'Windows programs',line:'Organise. Learn. Make your day easier.',open:'Show programs',close:'Collapse program menu',saldo:'See where your family’s money goes.',apartman:'Be ready for the next guest.',nyelv:'Learn Spanish at your own pace.',only:'Hungarian interface only · Spanish–Hungarian'},
  es:{title:'Programas para Windows',line:'Organiza. Aprende. Simplifica tu día.',open:'Mostrar programas',close:'Contraer menú de programas',saldo:'Descubre adónde va el dinero de tu familia.',apartman:'Prepárate para el próximo huésped.',nyelv:'Aprende español a tu ritmo.',only:'Interfaz solo en húngaro · español–húngaro'}
 };
 function mount(){
  const key=new URL(location.href).pathname.slice(base.pathname.length);
  const allowed=document.body.hasAttribute('data-laszlo-main')||/^(LaszloSaldo|LaszloApartman|LaszloNyelv)\/(index\.html)?$/.test(key);
  if(!allowed||document.getElementById('windows-program-dock'))return;
  const dock=document.createElement('aside');dock.id='windows-program-dock';dock.className='windows-program-dock';
  dock.innerHTML='<details><summary><span class="dock-heading"><strong data-dock="title"></strong><span data-dock="line"></span></span><span class="dock-state" aria-hidden="true"></span></summary><nav class="dock-links"><a data-dock-product="saldo"><strong>LaszloSaldo</strong><span data-dock="saldo"></span></a><a data-dock-product="apartman"><strong>LaszloApartman</strong><span data-dock="apartman"></span></a><a data-dock-product="nyelv"><strong>Laszlo Nyelvtanuló</strong><span data-dock="nyelv"></span><small data-dock="only"></small></a></nav></details>';
  const details=dock.querySelector('details'),summary=dock.querySelector('summary'),nav=dock.querySelector('nav');
  let saved=null;try{saved=localStorage.getItem('laszlo-windows-dock')}catch{}
  details.open=saved==='open'||(saved!=='closed'&&window.innerWidth>760);
  const paths={saldo:'LaszloSaldo/',apartman:'LaszloApartman/',nyelv:'LaszloNyelv/'};
  const language=()=>strings[document.documentElement.lang]?document.documentElement.lang:'es';
  function render(){const l=language(),d=strings[l];dock.querySelectorAll('[data-dock]').forEach(el=>el.textContent=d[el.dataset.dock]);dock.setAttribute('aria-label',d.title);nav.setAttribute('aria-label',d.title);summary.setAttribute('aria-label',details.open?d.close:d.open);summary.setAttribute('aria-expanded',String(details.open));dock.querySelector('.dock-state').textContent=details.open?'−':'+';dock.querySelectorAll('[data-dock-product]').forEach(a=>{const path=paths[a.dataset.dockProduct];const u=new URL(path,base);u.searchParams.set('lang',l);a.href=u.href;if(key===path||key===path+'index.html')a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
   const thumbs={saldo:{hu:'pic/családi költség.jpg',es:'pic/finanzas familiares.jpg',en:'pic/family budget.jpg'},apartman:{hu:'pic/apartmanok.jpg',es:'pic/apartementos.jpg',en:'pic/apartments-en.jpg'},nyelv:{hu:'LaszloNyelv/pic/overview.jpg',es:'LaszloNyelv/pic/overview.jpg',en:'LaszloNyelv/pic/overview.jpg'}};
   document.querySelectorAll('[data-program-preview]').forEach(img=>{const kind=img.dataset.programPreview;img.src=new URL(thumbs[kind][l],base).href;img.alt=(kind==='saldo'?'LaszloSaldo':kind==='apartman'?'LaszloApartman':'Laszlo Nyelvtanuló')+(kind==='nyelv'?' · '+d.only:'')});
  }
  function measure(){document.documentElement.style.setProperty('--windows-dock-space',Math.ceil(dock.getBoundingClientRect().height)+32+'px')}
  details.addEventListener('toggle',()=>{render();measure();try{localStorage.setItem('laszlo-windows-dock',details.open?'open':'closed')}catch{}});
  dock.addEventListener('keydown',e=>{if(e.key==='Escape'&&details.open){details.open=false;summary.focus()}});
  document.body.append(dock);document.body.classList.add('has-windows-dock');render();measure();
  if(window.ResizeObserver)new ResizeObserver(measure).observe(dock);window.addEventListener('resize',measure);new MutationObserver(()=>{render();measure()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 }
 document.readyState==='loading'?document.addEventListener('DOMContentLoaded',mount):mount();
})();
