export class ThemeToggle {
  static STORAGE_KEY = 'theme';
  static LIGHT = 'light';
  static DARK = 'dark';

  constructor({ buttonId }) {
    this.button = document.getElementById(buttonId);
    this.currentTheme = this.getInitialTheme();
    this.applyTheme(this.currentTheme);
    this.init();
  }

  getInitialTheme() {
    try {
      const saved = localStorage.getItem(ThemeToggle.STORAGE_KEY);
      if (saved === ThemeToggle.LIGHT || saved === ThemeToggle.DARK) {
        return saved;
      }
    } catch (e) {}

    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return ThemeToggle.DARK;
    }

    return ThemeToggle.LIGHT;
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    this.updateButton();
  }

  updateButton() {
    if (!this.button) return;

    const isDark = this.currentTheme === ThemeToggle.DARK;
    this.button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    this.button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  toggle() {
    const next = this.currentTheme === ThemeToggle.DARK ? ThemeToggle.LIGHT : ThemeToggle.DARK;

    this.applyTheme(next);

    try {
      localStorage.setItem(ThemeToggle.STORAGE_KEY, next);
    } catch (e) {}
  }

  init() {
    if (!this.button) return;
    this.button.addEventListener('click', () => this.toggle());
  }
}
