const state = { lang: localStorage.getItem("eureliaLang") || "en" };

const scriptBase = (() => {
  const script = document.currentScript;
  return script?.src ? new URL("../", script.src) : new URL("./", window.location.href);
})();

function getValue(obj, path) {
  return path.split(".").reduce((current, key) => current && current[key], obj);
}

async function loadLanguage(lang) {
  try {
    const url = new URL(`lang/${lang}.json`, scriptBase);
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`Language file not found: ${res.status}`);
    const data = await res.json();

    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const value = getValue(data, el.dataset.i18n);
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const value = getValue(data, el.dataset.i18nPlaceholder);
      if (typeof value === "string") el.placeholder = value;
    });

    document.querySelectorAll(".lang-current").forEach(el => {
      el.textContent = lang.toUpperCase() + " ▾";
    });

    localStorage.setItem("eureliaLang", lang);
    state.lang = lang;
  } catch (e) {
    console.warn("Language loading failed:", e);
    // The English text already present in the HTML remains visible as a safe fallback.
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadLanguage(state.lang);

  document.querySelectorAll(".lang-switcher").forEach(langSwitcher => {
    langSwitcher.querySelector(".lang-current")?.addEventListener("click", e => {
      e.stopPropagation();
      document.querySelectorAll(".lang-switcher").forEach(other => {
        if (other !== langSwitcher) other.classList.remove("open");
      });
      langSwitcher.classList.toggle("open");
    });

    langSwitcher.querySelectorAll(".lang-menu button").forEach(btn => {
      btn.addEventListener("click", () => {
        loadLanguage(btn.dataset.lang);
        langSwitcher.classList.remove("open");
      });
    });
  });

  document.addEventListener("click", e => {
    document.querySelectorAll(".lang-switcher").forEach(switcher => {
      if (!switcher.contains(e.target)) switcher.classList.remove("open");
    });
  });

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  toggle?.addEventListener("click", () => nav?.classList.toggle("open"));
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  const form = document.querySelector("#contactForm");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    const msg = document.querySelector("#formMessage");
    if (!msg) return;
    msg.textContent = state.lang === "es"
      ? "¡Gracias! Tu mensaje ha sido preparado. Conecta este formulario a tu email o servicio de reservas."
      : state.lang === "hu"
      ? "Köszönjük! Az üzeneted elkészült. A következő lépésben beköthetjük emailhez vagy foglalási rendszerhez."
      : "Thank you! Your enquiry is ready. Connect this form to your email or booking service.";
    form.reset();
  });
});
