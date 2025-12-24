import { Calendar, MapPin, Users, MessageSquare, X, Info, Newspaper } from 'lucide-react';
import { Concert } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

interface ConcertDetailProps {
  concert: Concert;
  onClose: () => void;
}

export function ConcertDetail({ concert, onClose }: ConcertDetailProps) {
  const { t, language } = useLanguage();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'JP') {
      return date.toLocaleDateString('ja-JP', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      });
    }
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 w-10 h-10 rounded-full bg-card hover:bg-secondary flex items-center justify-center transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Banner */}
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
            <img
              src={concert.image}
              alt={concert.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-4xl">
                <h1 className="text-white mb-2">{concert.artist}</h1>
                <h2 className="text-white/90 mb-4">{concert.title}</h2>
                
                <div className="flex flex-wrap gap-4 mb-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(concert.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{concert.venue}, {concert.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{concert.interestedCount} {t('interested')}</span>
                  </div>
                </div>
                
                <button className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors">
                  {t('buyTicket')}
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Info Card */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-primary" />
                <h3>Live Info</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">
                    {language === 'JP' ? '開場時間' : 'Doors Open'}
                  </p>
                  <p>17:30</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">
                    {language === 'JP' ? '開演時間' : 'Show Starts'}
                  </p>
                  <p>18:30</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">
                    {language === 'JP' ? '禁止事項' : 'Prohibited Items'}
                  </p>
                  <p className="text-muted-foreground">
                    {language === 'JP' 
                      ? '録音・録画機器、危険物の持ち込みは固くお断りいたします'
                      : 'Recording devices and dangerous items are strictly prohibited'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">
                    {language === 'JP' ? 'グッズ販売' : 'Merchandise Sales'}
                  </p>
                  <p>16:00 - 21:00</p>
                </div>
              </div>
            </div>

            {/* News Card */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="w-5 h-5 text-primary" />
                <h3>Latest News</h3>
              </div>
              
              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <p className="text-sm mb-2">
                    {language === 'JP' 
                      ? '新曲「夜に駆ける2025」リリース決定！'
                      : 'New single "Racing into the Night 2025" announced!'}
                  </p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-sm mb-2">
                    {language === 'JP'
                      ? '追加公演が決定しました'
                      : 'Additional tour dates announced'}
                  </p>
                  <p className="text-xs text-muted-foreground">5 days ago</p>
                </div>
                <div>
                  <p className="text-sm mb-2">
                    {language === 'JP'
                      ? 'アルバム「THE BOOK 3」発売中'
                      : 'Album "THE BOOK 3" now available'}
                  </p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Connection Section */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="mb-4">{t('whoGoing')}</h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {concert.attendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm truncate">{user.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-xs text-primary">{user.matchPercentage}% match</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full md:w-auto px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" />
              {t('joinGroupChat')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
