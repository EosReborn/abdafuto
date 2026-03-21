const THEME_KEY = "abdafuto-theme";

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
    toggle.setAttribute("aria-label", `${nextTheme} tema bekapcsolasa`);
    toggle.setAttribute("title", `${nextTheme} tema`);
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
    const current = document.body.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeToggle);
} else {
  initThemeToggle();
}
