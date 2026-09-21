const translations = {};
let currentLang = localStorage.getItem("costaluz_lang") || "es";

async function loadLanguage(lang){
  try{
    if(!translations[lang]){
      const res = await fetch(`lang/${lang}.json`, {cache:"no-store"});
      translations[lang] = await res.json();
    }
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.dataset.i18n;
      if(t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
      const key = el.dataset.i18nPlaceholder;
      if(t[key] !== undefined) el.placeholder = t[key];
    });
    document.querySelectorAll("[data-lang]").forEach(b=>b.classList.toggle("active", b.dataset.lang===lang));
    currentLang = lang;
    localStorage.setItem("costaluz_lang",lang);
    updateEstimate();
  }catch(e){ console.error("Language error", e); }
}
document.querySelectorAll("[data-lang]").forEach(btn=>btn.addEventListener("click",()=>loadLanguage(btn.dataset.lang)));

const arrival = document.getElementById("arrival");
const departure = document.getElementById("departure");
const estimate = document.getElementById("estimate");
const pricePerNight = 95;
function updateEstimate(){
  if(!arrival.value || !departure.value) return;
  const a = new Date(arrival.value+"T12:00:00");
  const d = new Date(departure.value+"T12:00:00");
  const nights = Math.round((d-a)/86400000);
  const t = translations[currentLang] || {};
  if(nights <= 0){
    estimate.textContent = t.estimate_invalid || "La salida debe ser posterior a la llegada.";
    return;
  }
  const total = nights*pricePerNight;
  estimate.textContent = `${nights} ${t.estimate_nights || "noches"} × ${pricePerNight} € = ${total} € · ${t.estimate_note || "estimación orientativa"}`;
}
[arrival,departure].forEach(i=>i.addEventListener("change",updateEstimate));

const today = new Date();
const iso = today.toISOString().split("T")[0];
arrival.min = iso; departure.min = iso;

document.getElementById("bookingForm").addEventListener("submit",e=>{
  e.preventDefault();
  const t = translations[currentLang] || {};
  alert(t.form_success || "Demo: la solicitud se enviaría ahora.");
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
document.querySelectorAll(".gallery-item img").forEach(img=>{
  img.addEventListener("click",()=>{
    lightboxImg.src = img.src.replace("w=1200","w=2000").replace("w=1600","w=2000");
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
  });
});
function closeLightbox(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true")}
document.getElementById("lightboxClose").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox) closeLightbox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape") closeLightbox()});

loadLanguage(currentLang);
