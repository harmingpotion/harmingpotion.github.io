// Thema Toggle

const THEME_KEY = 'health-app-theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (!themeToggle) return;

  // Laad opgeslagen thema of gebruik system voorkeur
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? THEME_DARK : THEME_LIGHT);
  
  applyTheme(initialTheme);

  // Toggle event listener
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || THEME_LIGHT;
    const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    applyTheme(newTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  
  // Update color-scheme voor native elementen
  document.documentElement.style.colorScheme = theme;
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initServiceWorker();
});

function initServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registratie succesvol:', registration.scope);
      })
      .catch((error) => {
        console.log('ServiceWorker registratie mislukt:', error);
      });
  });
}
