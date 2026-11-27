(() => {
  const availableLanguages = ['es', 'hu', 'en'];
  const languageButtons = [...document.querySelectorAll('[data-lang]')];
  const header = document.querySelector('.header');
  const menuButton = document.querySelector('.menu');
  let loadCounter = 0;

  async function setLanguage(language) {
    if (!availableLanguages.includes(language)) language = 'es';
    const currentLoad = ++loadCounter;
    try {
      const response = await fetch(`lang/${language}.json`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Could not load lang/${language}.json`);
      const dictionary = await response.json();
      if (currentLoad !== loadCounter) return;

      document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
          // The source dictionaries intentionally contain <em> tags for highlighted phrases.
          element.innerHTML = dictionary[key];
        }
      });

      document.documentElement.lang = language;
      document.title = dictionary.meta_title || document.title;
      const description = document.querySelector('meta[name="description"]');
      if (description && dictionary.meta_desc) description.content = dictionary.meta_desc;

      languageButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.lang === language);
      });
      localStorage.setItem('securix-hero-language', language);
    } catch (error) {
      console.error('Could not load the selected language file:', error);
    }
  }

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
  });

  menuButton.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });

  setLanguage(localStorage.getItem('securix-hero-language') || 'es');
})();
