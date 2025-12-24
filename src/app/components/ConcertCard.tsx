import { Calendar, MapPin, Users, MessageSquare } from 'lucide-react';
import { Concert } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

interface ConcertCardProps {
  concert: Concert;
  onViewDetails?: () => void;
}

export function ConcertCard({ concert, onViewDetails }: ConcertCardProps) {
  const { t, language } = useLanguage();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'JP') {
      return date.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-colors">
      <div className="relative h-48 overflow-hidden">
        <img
          src={concert.image}
          alt={concert.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white mb-1">{concert.artist}</h3>
          <p className="text-sm text-white/80">{concert.title}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(concert.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{concert.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{concert.interestedCount} {t('interested')}</span>
          </div>
        </div>
        
        {/* Attending Users */}
        {concert.attendingUsers.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">{t('whoGoing')}</p>
            <div className="flex -space-x-2">
              {concert.attendingUsers.map((user) => (
                <img
                  key={user.id}
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-card object-cover"
                  title={user.name}
                />
              ))}
              {concert.interestedCount > concert.attendingUsers.length && (
                <div className="w-8 h-8 rounded-full border-2 border-card bg-secondary flex items-center justify-center">
                  <span className="text-xs">+{concert.interestedCount - concert.attendingUsers.length}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <button
            onClick={onViewDetails}
            className="flex-1 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors text-sm"
          >
            {t('buyTicket')}
          </button>
          <button className="px-4 py-2 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground transition-colors flex items-center gap-2 text-sm">
            <MessageSquare className="w-4 h-4" />
            {t('joinGroupChat')}
          </button>
        </div>
      </div>
    </div>
  );
}
