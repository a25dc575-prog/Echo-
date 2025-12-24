import { Disc3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function EmptyState() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative mb-6">
        <Disc3 
          className="w-24 h-24 text-muted-foreground"
          style={{
            animation: 'spin 3s linear infinite',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-muted"></div>
        </div>
      </div>
      <p className="text-muted-foreground text-center max-w-md">
        {t('analyzingMusic')}
      </p>
      
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
