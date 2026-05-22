const THEME_KEY = "abdafuto-theme";
const COOKIE_KEY = "abdafuto-cookie";

const icons = {
  light:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.45 1.46l1.41-1.41-1.79-1.8-1.42 1.42 1.8 1.79zM17.24 19.16l1.8 1.79 1.41-1.41-1.79-1.8-1.42 1.42zM20 13h3v-2h-3v2zM11 23h2v-3h-2v3zm-7.45-4.46l1.41 1.41 1.8-1.79-1.42-1.42-1.79 1.8zM12 6a6 6 0 100 12 6 6 0 000-12z"/></svg>',
  dark:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.37 5.51A7 7 0 0018.49 14 9 9 0 1110 3c.46 0 .91.03 1.35.1-.87.62-1.55 1.46-1.98 2.41z"/></svg>',
};

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    const nextTheme = theme === "dark" ? "light" : "dark";
    toggle.innerHTML = theme === "dark" ? icons.light : icons.dark;
    toggle.setAttribute("aria-label", `${nextTheme} téma bekapcsolása`);
    toggle.setAttribute("title", `${nextTheme} téma`);
  }
}

function initThemeToggle() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  const toggle = document.createElement("button");
  toggle.className = "theme-toggle";
  toggle.type = "button";
  document.body.appendChild(toggle);

  applyTheme(savedTheme);

  toggle.addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
}

function initScrollAnimations() {
  if (!("IntersectionObserver" in window)) return;

  const selectors = [
    ".slide-card",
    ".service-box",
    ".lead-cta",
    ".features",
    ".custom-build",
    ".maps",
    ".hours",
    ".subpage-hero",
    ".contact-grid > *",
    ".feature-list li",
    ".site-footer",
  ];

  const targets = document.querySelectorAll(selectors.join(","));
  targets.forEach((el) => el.classList.add("anim-hidden"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("anim-hidden");
          entry.target.classList.add("anim-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

function initCookieBanner() {
  if (localStorage.getItem(COOKIE_KEY)) return;

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.id = "cookieBanner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Süti hozzájárulás");
  banner.innerHTML = `
    <div class="cookie-inner">
      <p>Weboldalunk sütiket (cookie-kat) használ a jobb felhasználói élmény biztosítása érdekében. Az oldal böngészésével elfogadja a süti-szabályzatunkat.</p>
      <div class="cookie-actions">
        <a class="cookie-link" href="https://www.abdafuto.hu/adatvedelmi-iranyelvek/" target="_blank" rel="noreferrer">Adatvédelmi irányelvek</a>
        <button class="cookie-decline" id="cookieDecline" type="button">Elutasítom</button>
        <button class="cookie-accept" id="cookieAccept" type="button">Elfogadom</button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => banner.classList.add("cookie-visible"));
  });

  function dismiss(value) {
    localStorage.setItem(COOKIE_KEY, value);
    banner.classList.remove("cookie-visible");
    banner.addEventListener("transitionend", () => banner.remove(), { once: true });
  }

  document.getElementById("cookieAccept").addEventListener("click", () => dismiss("accepted"));
  document.getElementById("cookieDecline").addEventListener("click", () => dismiss("declined"));
}

function init() {
  initThemeToggle();
  initScrollAnimations();
  initCookieBanner();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
