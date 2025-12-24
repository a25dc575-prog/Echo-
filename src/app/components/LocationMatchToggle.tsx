import { MapPin } from 'lucide-react';
import { Switch } from './ui/switch';
import { useLanguage } from '../contexts/LanguageContext';

interface LocationMatchToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function LocationMatchToggle({ enabled, onToggle }: LocationMatchToggleProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-card rounded-lg p-4 border border-border flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          enabled ? 'bg-primary/20' : 'bg-secondary'
        }`}>
          <MapPin className={`w-5 h-5 ${enabled ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
        <div>
          <p className="font-medium">{t('locationMatching')}</p>
          <p className="text-sm text-muted-foreground">
            {enabled ? t('nearby') : 'Off'}
          </p>
        </div>
      </div>
      <Switch checked={enabled} onCheckedChange={onToggle} />
    </div>
  );
}
