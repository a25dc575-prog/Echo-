import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      onClick={toggleTheme}
      className="group relative w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-all duration-300 overflow-hidden"
      title={theme === 'dark' ? t('lightMode') : t('darkMode')}
      aria-label={t('toggleTheme')}
    >
      {/* Sun Icon for Light Mode */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          theme === 'light'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 rotate-180 scale-0'
        }`}
      >
        <Sun className="w-5 h-5 text-orange-500" />
      </div>

      {/* Moon Icon for Dark Mode */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          theme === 'dark'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 -rotate-180 scale-0'
        }`}
      >
        <Moon className="w-5 h-5 text-blue-400" />
      </div>

      {/* Ripple Effect on Hover */}
      <div className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
    </button>
  );
}
