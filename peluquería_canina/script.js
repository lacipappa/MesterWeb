/* Mancs & Móka — stabil, nem White Label verzió
   A fordítások valódi JSON fájlokban vannak: lang/hu.json, lang/en.json, lang/es.json.
   A képek és a vállalkozás adatai a scriptben maradnak, ezért a képbetöltés nem függ a fordításoktól. */
const TRANSLATIONS = {};
const BUSINESS = {"brandName": "Mancs & Móka", "phone": "+36 30 123 4567", "whatsapp": "+36 30 123 4567", "email": "hello@mancsesmoka.hu", "address": "1136 Budapest, Mancs utca 12.", "instagram": "https://instagram.com/mancsesmoka", "primaryColor": "#c88352", "heroImage": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1800&q=88", "aboutImage": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1400&q=88", "beforeImage": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1600&q=88", "afterImage": "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1600&q=88", "galleryImages": ["https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1400&q=88", "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1400&q=88", "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1400&q=88", "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=88", "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1400&q=88"], "openingHours": {"hu": "H–P: 8:00–18:00 | Sz: 9:00–14:00", "en": "Mon–Fri: 8:00–18:00 | Sat: 9:00–14:00", "es": "Lun–Vie: 8:00–18:00 | Sáb: 9:00–14:00"}, "services": [{"name": {"hu": "Teljes kozmetika", "en": "Full grooming", "es": "Peluquería completa"}, "description": {"hu": "Fürdetés, szárítás, bontás, nyírás vagy trimmelés, mancs- és fülápolás.", "en": "Bath, drying, detangling, clipping or trimming, paw and ear care.", "es": "Baño, secado, desenredado, corte o trimming y cuidado de patas y oídos."}, "price": "12 500 Ft-tól"}, {"name": {"hu": "Fürdetés & szárítás", "en": "Bath & dry", "es": "Baño y secado"}, "description": {"hu": "Bőrtípushoz illő sampon, alapos szárítás és kifésülés a friss, könnyű szőrzetért.", "en": "Skin-appropriate shampoo, thorough drying and brushing for a fresh, light coat.", "es": "Champú adecuado, secado completo y cepillado para un pelaje limpio y ligero."}, "price": "6 500 Ft-tól"}, {"name": {"hu": "Fazonigazítás", "en": "Style trim", "es": "Corte y arreglo"}, "description": {"hu": "A kutyus szőrtípusához és életmódjához igazított nyírás, trimmelés és formázás.", "en": "Clipping, trimming and styling adapted to your dog's coat and lifestyle.", "es": "Corte, trimming y acabado adaptados al pelaje y estilo de vida de tu perro."}, "price": "8 500 Ft-tól"}, {"name": {"hu": "Kölyök első élménye", "en": "Puppy's first visit", "es": "Primera visita del cachorro"}, "description": {"hu": "Rövid, játékos ismerkedés a kozmetikával, hogy a későbbi alkalmak természetesek legyenek.", "en": "A short, playful introduction so future grooming visits feel natural.", "es": "Una introducción corta y positiva para que las futuras visitas sean naturales."}, "price": "5 500 Ft-tól"}], "prices": [{"name": {"hu": "Mini frissítés", "en": "Mini refresh", "es": "Mini retoque"}, "description": {"hu": "Gyors alapápolás két teljes kozmetika között.", "en": "Quick care between full grooming visits.", "es": "Cuidado rápido entre dos sesiones completas."}, "price": "3 000 Ft-tól", "features": {"hu": ["Karomvágás", "Mancsápolás", "Higiéniai igazítás"], "en": ["Nail trim", "Paw care", "Hygiene trim"], "es": ["Corte de uñas", "Cuidado de patas", "Arreglo higiénico"]}}, {"name": {"hu": "Teljes kozmetika", "en": "Full grooming", "es": "Peluquería completa"}, "description": {"hu": "A teljes szépülés, amit a legtöbb vendég választ.", "en": "The complete grooming package most guests choose.", "es": "El servicio completo que elige la mayoría de nuestros clientes."}, "price": "12 500 Ft-tól", "features": {"hu": ["Fürdetés & szárítás", "Bontás & fazonigazítás", "Mancs- & fülápolás"], "en": ["Bath & dry", "Detangling & styling", "Paw & ear care"], "es": ["Baño y secado", "Desenredado y corte", "Cuidado de patas y oídos"]}, "featured": true}, {"name": {"hu": "Extra Spa", "en": "Extra Spa", "es": "Extra Spa"}, "description": {"hu": "Teljes kozmetika egy kis extra kényeztetéssel.", "en": "Full grooming with a little extra pampering.", "es": "Peluquería completa con un extra de cuidado."}, "price": "16 500 Ft-tól", "features": {"hu": ["Prémium kozmetikum", "Ápoló pakolás", "Extra szőrzetápolás"], "en": ["Premium cosmetics", "Conditioning treatment", "Extra coat care"], "es": ["Cosmética premium", "Tratamiento nutritivo", "Cuidado extra del pelaje"]}}]};

(() => {
  const supported = ["hu","en","es"];
  const cleanPhone = v => String(v || "").replace(/[^\d+]/g, "");
  const getStored = () => { try { return localStorage.getItem("mancs-language"); } catch(e) { return null; } };
  const setStored = v => { try { localStorage.setItem("mancs-language", v); } catch(e) {} };
  let lang = supported.includes(getStored()) ? getStored() : "hu";

  const FALLBACK_UI = {
    service_book: "Időpontot kérek →",
    popular: "Legnépszerűbb",
    choose: "Ezt választom →"
  };

  async function loadTranslations(code) {
    if (TRANSLATIONS[code]) return TRANSLATIONS[code];
    try {
      const response = await fetch(`lang/${code}.json`, { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      TRANSLATIONS[code] = data;
      return data;
    } catch (error) {
      console.error(`A(z) ${code}.json nyelvi fájl nem tölthető be:`, error);
      TRANSLATIONS[code] = {};
      return TRANSLATIONS[code];
    }
  }

  const t = (key, fallback = "") => {
    const dict = TRANSLATIONS[lang] || {};
    return dict[key] ?? FALLBACK_UI[key] ?? fallback;
  };

  const local = value => (value && typeof value === "object" && !Array.isArray(value))
    ? (value[lang] ?? value.hu ?? value.en ?? Object.values(value)[0] ?? "")
    : (value ?? "");

  function applyStaticTranslations() {
    const dict = TRANSLATIONS[lang] || {};
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(dict, key)) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (Object.prototype.hasOwnProperty.call(dict, key)) el.placeholder = dict[key];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => {
      const key = el.dataset.i18nAria;
      if (Object.prototype.hasOwnProperty.call(dict, key)) el.setAttribute("aria-label", dict[key]);
    });
    document.querySelectorAll("[data-lang]").forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function applyBusiness() {
    const c = BUSINESS;
    document.documentElement.style.setProperty("--primary", c.primaryColor || "#c88352");
    document.title = lang === "en" ? "Mancs & Móka — Dog grooming" : lang === "es" ? "Mancs & Móka — Peluquería canina" : "Mancs & Móka — Kutyakozmetika";
    document.querySelectorAll("[data-brand]").forEach(el => el.textContent = c.brandName);
    document.querySelectorAll("[data-phone]").forEach(el => el.textContent = c.phone);
    document.querySelectorAll("[data-address]").forEach(el => el.textContent = c.address);
    document.querySelectorAll("[data-hours]").forEach(el => el.textContent = local(c.openingHours));

    const setLink=(id,href,text)=>{const el=document.getElementById(id); if(el){el.href=href; el.textContent=text;}};
    setLink("bookingEmail", `mailto:${c.email}`, c.email);
    setLink("contactPhone", `tel:${cleanPhone(c.phone)}`, c.phone);
    setLink("footerPhone", `tel:${cleanPhone(c.phone)}`, c.phone);
    setLink("footerEmail", `mailto:${c.email}`, c.email);
    const ig=document.getElementById("instagramLink"); if(ig){ig.href=c.instagram; ig.textContent=c.instagram.replace(/^https?:\/\/(www\.)?/i,"").replace(/\/$/,"");}
    const map=document.getElementById("mapLink"); if(map) map.href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}`;
    const hero=document.getElementById("heroBg"); if(hero) hero.style.backgroundImage=`url("${c.heroImage}")`;
    const split=document.getElementById("splitPhoto"); if(split) split.style.backgroundImage=`url("${c.heroImage}")`;
    const about=document.getElementById("aboutImage"); if(about) about.src=c.aboutImage;
    const beforeImg=document.getElementById("beforeImage"); if(beforeImg) beforeImg.src=c.beforeImage;
    const afterImg=document.getElementById("afterImage"); if(afterImg) afterImg.src=c.afterImage;
  }

  function renderGallery() {
    const grid=document.getElementById("galleryGrid"); if(!grid) return; grid.innerHTML="";
    BUSINESS.galleryImages.forEach((src,i)=>{
      const b=document.createElement("button"); b.type="button"; b.dataset.full=src;
      const img=document.createElement("img"); img.src=src; img.alt=`Kutyakozmetika galéria ${i+1}`; img.loading="lazy";
      b.appendChild(img); grid.appendChild(b);
    });
  }

  function renderServices() {
    const grid=document.getElementById("servicesGrid"), select=document.getElementById("serviceSelect");
    if(grid) grid.innerHTML=""; if(select) select.innerHTML="";
    const icons=["✂","◌","⌁","♡","✦","✧"];
    BUSINESS.services.forEach((s,i)=>{
      if(grid){
        const a=document.createElement("article"); a.className="service";
        a.innerHTML=`<div class="service-num">${String(i+1).padStart(2,"0")}</div><span class="service-icon">${icons[i%icons.length]}</span><h3></h3><p></p><div><b></b><a href="#booking"></a></div>`;
        a.querySelector("h3").textContent=local(s.name); a.querySelector("p").textContent=local(s.description); a.querySelector("b").textContent=s.price; a.querySelector("a").textContent=t("service_book", "Időpontot kérek →"); grid.appendChild(a);
      }
      if(select){ const o=document.createElement("option"); o.value=local(s.name); o.textContent=local(s.name); select.appendChild(o); }
    });
  }

  function renderPrices() {
    const grid=document.getElementById("pricesGrid"); if(!grid) return; grid.innerHTML="";
    BUSINESS.prices.forEach(item=>{
      const a=document.createElement("article"); a.className=`price${item.featured?" featured":""}`;
      if(item.featured){const pop=document.createElement("span"); pop.className="popular"; pop.textContent=t("popular", "Legnépszerűbb"); a.appendChild(pop);}
      const h=document.createElement("h3"); h.textContent=local(item.name); a.appendChild(h);
      const p=document.createElement("p"); p.textContent=local(item.description); a.appendChild(p);
      const strong=document.createElement("strong"); strong.textContent=item.price; a.appendChild(strong);
      const ul=document.createElement("ul"); (local(item.features)||[]).forEach(f=>{const li=document.createElement("li"); li.textContent=f; ul.appendChild(li);}); a.appendChild(ul);
      const link=document.createElement("a"); link.href="#booking"; link.textContent=t("choose", "Ezt választom →"); a.appendChild(link); grid.appendChild(a);
    });
  }

  async function setLanguage(next) {
    if(!supported.includes(next)) return;
    lang=next;
    setStored(next);
    await loadTranslations(lang);
    applyStaticTranslations();
    applyBusiness();
    renderServices();
    renderPrices();
  }
  window.setLanguage=setLanguage;

  document.addEventListener("DOMContentLoaded", async ()=>{
    // A képek és az alapadatok a nyelvi fájloktól függetlenül azonnal betöltődnek.
    applyBusiness();
    renderGallery();

    // Ezután betöltjük az aktuális valódi JSON nyelvi fájlt.
    await loadTranslations(lang);
    applyStaticTranslations();
    renderServices();
    renderPrices();

    document.querySelectorAll("[data-lang]").forEach(btn=>btn.addEventListener("click",()=>setLanguage(btn.dataset.lang)));

    const menu=document.querySelector(".menu"), nav=document.querySelector(".nav nav");
    menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open)}); nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

    const lb=document.getElementById("lightbox"), lbImg=document.getElementById("lightboxImg");
    document.getElementById("galleryGrid")?.addEventListener("click",e=>{const b=e.target.closest("button[data-full]"); if(b&&lb&&lbImg){lbImg.src=b.dataset.full; lb.classList.add("open");}});
    lb?.addEventListener("click",e=>{if(e.target===lb)lb.classList.remove("open")}); lb?.querySelector("button")?.addEventListener("click",()=>lb.classList.remove("open"));
    document.addEventListener("keydown",e=>{if(e.key==="Escape")lb?.classList.remove("open")});

    const range=document.querySelector(".comparison input"), before=document.querySelector(".comparison .before"), divider=document.querySelector(".comparison .divider");
    const compare=()=>{if(range&&before&&divider){before.style.width=`${range.value}%`; divider.style.left=`${range.value}%`;}}; range?.addEventListener("input",compare); compare();

    document.getElementById("bookingForm")?.addEventListener("submit",e=>{
      e.preventDefault(); const data=new FormData(e.currentTarget);
      const labels={hu:["Időpontkérés","Név","Kutyus","Telefon","Szolgáltatás","Preferált időpont"],en:["Appointment request","Name","Dog","Phone","Service","Preferred time"],es:["Solicitud de cita","Nombre","Perro","Teléfono","Servicio","Horario preferido"]}[lang];
      const message=`${labels[0]} — ${BUSINESS.brandName}\n${labels[1]}: ${data.get("name")}\n${labels[2]}: ${data.get("dog")}\n${labels[3]}: ${data.get("phone")}\n${labels[4]}: ${data.get("service")}\n${labels[5]}: ${data.get("message")||"-"}`;
      const wa=cleanPhone(BUSINESS.whatsapp).replace(/^\+/,"");
      if(wa) window.open(`https://wa.me/${wa}?text=${encodeURIComponent(message)}`,"_blank","noopener");
      else window.location.href=`mailto:${BUSINESS.email}?subject=${encodeURIComponent(labels[0])}&body=${encodeURIComponent(message)}`;
      const success=e.currentTarget.querySelector(".success"); if(success) success.hidden=false;
    });

    const obs=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting)x.target.classList.add("visible")}),{threshold:.12});
    document.querySelectorAll(".service,.cards article,.price,.review-grid blockquote").forEach(el=>{el.classList.add("reveal");obs.observe(el)});
  });
})();
