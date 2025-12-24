import { useState } from 'react';
import { Users, Hand, Heart, MapPin, ChevronDown, ChevronUp, Camera, Coffee, Film, Tent, Palette, Music2, Book, Utensils, Gamepad2, Plane } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockExploreUsers } from '../data/mockData';

// Interest icon mapping
const interestIcons: Record<string, typeof Camera> = {
  Photography: Camera,
  Coffee: Coffee,
  Film: Film,
  Gaming: Gamepad2,
  Camping: Tent,
  Skateboarding: Palette,
  Art: Palette,
  Fashion: Palette,
  Dancing: Music2,
  Travel: Plane,
  Reading: Book,
  Cooking: Utensils,
  Writing: Book,
  Hiking: Tent,
  Anime: Film,
  Drawing: Palette,
  Piano: Music2,
  Tea: Coffee,
  Museums: Book,
  DJing: Music2,
  Nightlife: Music2,
  Tech: Gamepad2,
  Yoga: Music2,
  Skincare: Coffee,
  Concerts: Music2,
};

export function ExplorePage() {
  const { t } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    matchRate: [80, 100],
    distance: 50,
    genres: [] as string[],
    interests: [] as string[],
  });

  const onlineUsers = mockExploreUsers.filter(user => user.isOnline);

  return (
    <div className="space-y-6 pb-8">
      {/* Header with Online Counter */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2">{t('exploreMatches')}</h2>
            <div className="flex items-center gap-2 text-primary">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm">
                <span className="font-semibold">{onlineUsers.length}</span> {t('peopleOnline')}
              </span>
            </div>
          </div>
          
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-secondary border border-border rounded-lg transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>{t('filters')}</span>
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Filters */}
      {showFilters && (
        <div className="bg-card rounded-2xl p-6 border border-border space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Match Rate Filter */}
            <div>
              <label className="block text-sm font-medium mb-3">{t('matchRate')}</label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.matchRate[0]}
                  onChange={(e) => setFilters({...filters, matchRate: [parseInt(e.target.value), filters.matchRate[1]]})}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{filters.matchRate[0]}%</span>
                  <span>-</span>
                  <span>{filters.matchRate[1]}%</span>
                </div>
              </div>
            </div>

            {/* Distance Filter */}
            <div>
              <label className="block text-sm font-medium mb-3">{t('distance')}</label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={filters.distance}
                  onChange={(e) => setFilters({...filters, distance: parseInt(e.target.value)})}
                  className="w-full accent-primary"
                />
                <div className="text-center text-sm text-muted-foreground">
                  {filters.distance} {t('away')}
                </div>
              </div>
            </div>

            {/* Music Genre Filter */}
            <div>
              <label className="block text-sm font-medium mb-3">{t('genre')}</label>
              <select className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
                <option value="">{t('selectGenre')}</option>
                <option>J-Pop</option>
                <option>Rock</option>
                <option>Jazz</option>
                <option>Electronic</option>
                <option>Hip-Hop</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockExploreUsers.map((user) => (
          <div
            key={user.id}
            className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
          >
            {/* 4:5 Ratio Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Glassmorphism Match Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full">
                <span className="text-white text-sm font-semibold">{user.matchPercentage}% Match</span>
              </div>

              {/* Online Status Badge */}
              {user.isOnline && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary/90 backdrop-blur-md rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-xs font-medium">{t('online')}</span>
                </div>
              )}

              {/* Gradient Overlay at Bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* User Info Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
                <div className="flex items-center gap-2 text-sm text-white/90 mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{user.location}</span>
                  <span>•</span>
                  <span>{user.age} {t('yearsOld')}</span>
                </div>

                {/* Music Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {user.musicTags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Interests with Icons */}
                {user.interests && user.interests.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    {user.interests.slice(0, 3).map((interest) => {
                      const Icon = interestIcons[interest] || Music2;
                      return (
                        <div
                          key={interest}
                          className="flex items-center gap-1.5 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full"
                          title={interest}
                        >
                          <Icon className="w-3 h-3" />
                          <span className="text-xs">{interest}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-lg transition-all">
                    <Hand className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('sendWave')}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 rounded-lg transition-all">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('like')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
