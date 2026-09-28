const L=['hu','en','es'];
let lang=localStorage.getItem('mesterweb_lang')||'es';
const T={
 hu:{back:'← Főoldal',contact:'Kapcsolat',sources:'Képforrások',meta_title:'MesterWeb – Modern weboldalak vállalkozásoknak',meta_description:'A MesterWeb modern, gyors és mobilbarát weboldalakat készít kisvállalkozásoknak és helyi szolgáltatóknak.',topbar_text:'MODERN WEBOLDALAK KISVÁLLALKOZÁSOKNAK',topbar_link:'Egyeztessünk a projektjéről →',nav_services:'Szolgáltatások',nav_examples:'Példák',nav_trial:'30 napos próba',nav_crm:'Digitális rendszerek',nav_why:'Miért MesterWeb?',nav_process:'Hogyan működik?',nav_about:'Rólam',nav_faq:'GYIK',nav_contact:'Kapcsolat',nav_cta:'Érdeklődöm',footer_desc:'Modern weboldalak kisvállalkozásoknak.',footer_menu:'Menü',footer_choice:'Landing vagy weboldal?',footer_whatsapp:'WhatsApp – csak üzenet',footer_sources:'Képforrások',credit_note:'Képforrások és fotósok megtekintése →',footer_copy:'© 2026 MesterWeb – Weboldalak vállalkozásoknak',footer_demo:'Bemutató weboldal – a tartalom és az elérhetőségek később személyre szabhatók.',consult_3_title:'Egyeztetés az Ön igényeiről'},
 en:{back:'← Home',contact:'Contact',sources:'Image sources',meta_title:'MesterWeb – Modern websites for small businesses',meta_description:'MesterWeb creates modern, fast and mobile-friendly websites for small businesses and local service providers.',topbar_text:'MODERN WEBSITES FOR SMALL BUSINESSES',topbar_link:'Discuss your project →',nav_services:'Services',nav_examples:'Examples',nav_trial:'30-day trial',nav_crm:'Digital systems',nav_why:'Why MesterWeb?',nav_process:'How it works',nav_about:'About me',nav_faq:'FAQ',nav_contact:'Contact',nav_cta:'Enquire now',footer_desc:'Modern websites for small businesses.',footer_menu:'Menu',footer_choice:'Landing page or website?',footer_whatsapp:'WhatsApp – messages only',footer_sources:'Image sources',credit_note:'View image sources and photographers →',footer_copy:'© 2026 MesterWeb – Websites for businesses',footer_demo:'Demo website – content and contact details can be personalised later.',consult_3_title:'Discuss your project'},
 es:{back:'← Inicio',contact:'Contacto',sources:'Fuentes de imágenes',meta_title:'MesterWeb – Páginas web para pequeños negocios en España',meta_description:'MesterWeb crea páginas web modernas, rápidas y adaptadas a móviles para pequeños negocios y profesionales en España.',topbar_text:'PÁGINAS WEB MODERNAS PARA PEQUEÑOS NEGOCIOS',topbar_link:'Hablemos de tu proyecto →',nav_services:'Servicios',nav_examples:'Ejemplos',nav_trial:'Prueba de 30 días',nav_crm:'Sistemas digitales',nav_why:'¿Por qué MesterWeb?',nav_process:'Cómo funciona',nav_about:'Sobre mí',nav_faq:'FAQ',nav_contact:'Contacto',nav_cta:'Solicitar información',footer_desc:'Páginas web modernas para pequeños negocios.',footer_menu:'Menú',footer_choice:'¿Landing page o web completa?',footer_whatsapp:'WhatsApp – solo mensajes',footer_sources:'Fuentes de imágenes',credit_note:'Ver fuentes de imágenes y fotógrafos →',footer_copy:'© 2026 MesterWeb – Páginas web para negocios',footer_demo:'Web de demostración – el contenido y los datos de contacto se pueden personalizar.',consult_3_title:'Hablemos de tu proyecto'}
};
function setMeta(id,content){const e=document.getElementById(id);if(e)e.setAttribute('content',content)}
function setLang(x){
  if(!L.includes(x))x='es';
  lang=x;
  document.documentElement.lang=x;
  document.querySelectorAll('[data-content-lang]').forEach(e=>e.hidden=e.dataset.contentLang!==x);
  document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===x));
  const tx=T[x];
  document.querySelectorAll('[data-i18n]').forEach(e=>{if(tx[e.dataset.i18n])e.textContent=tx[e.dataset.i18n]});
  if(tx.meta_title)document.title=tx.meta_title;
  setMeta('meta-description',tx.meta_description);
  setMeta('og-title',tx.meta_title);
  setMeta('og-description',tx.meta_description);
  setMeta('twitter-title',tx.meta_title);
  setMeta('twitter-description',tx.meta_description);
  setMeta('og-locale',x==='es'?'es_ES':x==='en'?'en_GB':'hu_HU');
  localStorage.setItem('mesterweb_lang',x)
}
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));setLang(lang)});
