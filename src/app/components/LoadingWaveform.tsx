import { useLanguage } from '../contexts/LanguageContext';

export function LoadingWaveform() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="flex items-end gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-primary rounded-full"
            style={{
              height: '40px',
              animation: `wave 1s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
      <p className="text-muted-foreground">{t('analyzingMusic')}</p>
      
      <style>{`
        @keyframes wave {
          0%, 100% {
            height: 16px;
          }
          50% {
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
}
