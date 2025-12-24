import { Home, Users, Music, MessageCircle, User, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Navigation({ activeView, onViewChange }: NavigationProps) {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', icon: Home, label: t('home') },
    { id: 'explore', icon: Users, label: t('explore') },
    { id: 'search', icon: Search, label: t('search') },
    { id: 'concerts', icon: Music, label: t('concerts') },
    { id: 'chat', icon: MessageCircle, label: t('chat') },
    { id: 'profile', icon: User, label: t('profile') },
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-20 bg-card border-r border-border flex flex-col items-center py-8 gap-6">
      <div className="mb-8">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <Music className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
      
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`group relative w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
            title={item.label}
          >
            <Icon className="w-6 h-6" />
            
            {/* Tooltip */}
            <div className="absolute left-full ml-4 px-3 py-2 bg-popover text-popover-foreground rounded-md text-sm whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-border">
              {item.label}
            </div>
          </button>
        );
      })}
    </nav>
  );
}