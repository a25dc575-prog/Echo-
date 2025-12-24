import { useLanguage } from '../contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex rounded-lg bg-secondary p-1">
      <button
        onClick={() => setLanguage('JP')}
        className={`px-4 py-2 rounded-md transition-colors ${
          language === 'JP'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        JP
      </button>
      <button
        onClick={() => setLanguage('EN')}
        className={`px-4 py-2 rounded-md transition-colors ${
          language === 'EN'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
    </div>
  );
}
