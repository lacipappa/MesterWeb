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


   'image-sources.html':['Image sources','Créditos y fuentes de las imágenes utilizadas en Laszlo-MesterWeb.']
  };
  if(pages[key]){
   const apply=()=>{const selected=pages[key];document.title=selected[0]+' | Laszlo-MesterWeb';document.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]').forEach(e=>e.content=selected[1]);document.querySelectorAll('meta[property="og:title"],meta[name="twitter:title"]').forEach(e=>e.content=document.title);};
   apply();new MutationObserver(()=>queueMicrotask(apply)).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }

 };
 document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
