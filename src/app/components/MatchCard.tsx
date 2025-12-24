import { MessageCircle, User as UserIcon } from 'lucide-react';
import { User } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

interface MatchCardProps {
  user: User;
  onStartChat?: () => void;
}

export function MatchCard({ user, onStartChat }: MatchCardProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-card rounded-lg p-4 border border-border hover:border-primary transition-colors">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {user.isOnline && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-card"></div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-foreground">{user.name}</h4>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm text-primary">{user.matchPercentage}%</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {user.musicTags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-secondary text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            {t('bothLike')}: {user.commonArtists.join(', ')}
          </p>
          
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors flex items-center justify-center gap-2 text-sm">
              <UserIcon className="w-4 h-4" />
              {t('viewProfile')}
            </button>
            <button
              onClick={onStartChat}
              className="flex-1 px-3 py-2 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              {t('startChat')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
