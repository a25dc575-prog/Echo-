import { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Sparkles, 
  Clock, 
  Play,
  Filter,
  ChevronDown,
  VolumeX,
  ListPlus,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Skeleton } from './ui/skeleton';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from './ui/pagination';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import { Button } from './ui/button';
import {
  mockRankingSongs,
  mockVideoRecommendations,
  mockTrendingCategories,
  RankingSong,
} from '../data/mockData';

// Cascader data structure
const cascaderData = {
  japan: {
    nameJP: '日本',
    nameEN: 'Japan',
    cities: {
      tokyo: {
        nameJP: '東京',
        nameEN: 'Tokyo',
        genres: ['jPop', 'jRock', 'pop', 'rock'],
      },
      osaka: {
        nameJP: '大阪',
        nameEN: 'Osaka',
        genres: ['jPop', 'jRock', 'pop'],
      },
    },
  },
  usa: {
    nameJP: 'アメリカ',
    nameEN: 'USA',
    cities: {
      newYork: {
        nameJP: 'ニューヨーク',
        nameEN: 'New York',
        genres: ['pop', 'rock', 'hiphop'],
      },
      losAngeles: {
        nameJP: 'ロサンゼルス',
        nameEN: 'Los Angeles',
        genres: ['pop', 'rock', 'hiphop'],
      },
    },
  },
  korea: {
    nameJP: '韓国',
    nameEN: 'Korea',
    cities: {
      seoul: {
        nameJP: 'ソウル',
        nameEN: 'Seoul',
        genres: ['kPop', 'pop', 'hiphop'],
      },
      busan: {
        nameJP: '釜山',
        nameEN: 'Busan',
        genres: ['kPop', 'pop'],
      },
    },
  },
};

export function SearchPage() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState(['藤井風', 'Billboard 200', 'YOASOBI']);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [selectedSong, setSelectedSong] = useState<RankingSong | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [clearHistoryPopover, setClearHistoryPopover] = useState(false);
  
  // Cascader states
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [filterOpen, setFilterOpen] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockRankingSongs.length / itemsPerPage);

  // Simulate loading with progress
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    const progressTimer = setInterval(() => {
      setLoadingProgress((prev) => (prev >= 100 ? 100 : prev + 8));
    }, 80);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  const handleSearchHistoryClick = (query: string) => {
    setSearchQuery(query);
  };

  const handleRemoveHistory = (query: string) => {
    setSearchHistory(searchHistory.filter((item) => item !== query));
  };

  const handleClearAllHistory = () => {
    setSearchHistory([]);
    setClearHistoryPopover(false);
  };

  const handleSongClick = (song: RankingSong) => {
    setSelectedSong(song);
    setIsDrawerOpen(true);
  };

  const handleSongCheckbox = (songId: string) => {
    setSelectedSongs(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const handleSelectAllSongs = () => {
    if (selectedSongs.length === currentPageSongs.length) {
      setSelectedSongs([]);
    } else {
      setSelectedSongs(currentPageSongs.map(song => song.id));
    }
  };

  const getTrendIcon = (trend: string, trendValue?: number) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'new':
        return <Sparkles className="w-4 h-4 text-primary" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-600';
    return 'text-muted-foreground';
  };

  // Get current page songs
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageSongs = mockRankingSongs.slice(startIndex, startIndex + itemsPerPage);

  const availableCities = selectedCountry ? Object.keys(cascaderData[selectedCountry as keyof typeof cascaderData]?.cities || {}) : [];
  const availableGenres = selectedCity && selectedCountry 
    ? cascaderData[selectedCountry as keyof typeof cascaderData]?.cities[selectedCity as keyof typeof cascaderData['japan']['cities']]?.genres || []
    : [];

  return (
    <div className="space-y-6">
      {/* Loading Progress Bar */}
      {isLoading && (
        <div className="fixed top-0 left-20 right-0 z-50">
          <Progress value={loadingProgress} className="h-1 rounded-none bg-secondary">
            <div className="h-full bg-primary transition-all" style={{ width: `${loadingProgress}%` }} />
          </Progress>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-card border border-border rounded-lg shadow-lg">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="animate-spin">⚙️</span>
              {t('calculatingMatches')}
            </p>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm -mx-4 md:-mx-8 px-4 md:px-8 py-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            placeholder={t('searchPlaceholder')}
            className="w-full h-12 pl-12 pr-4 bg-[#242424] border-2 border-transparent rounded-lg transition-colors focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search History Tags */}
      {searchHistory.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t('recentSearches')}</span>
            </div>
            <Popover open={clearHistoryPopover} onOpenChange={setClearHistoryPopover}>
              <PopoverTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('clearHistory')}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <p className="text-sm">{t('confirmClearHistory')}</p>
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setClearHistoryPopover(false)}
                    >
                      {t('cancel')}
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleClearAllHistory}
                    >
                      {t('confirm')}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((query, index) => (
              <button
                key={index}
                onClick={() => handleSearchHistoryClick(query)}
                className="group inline-flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-sm transition-colors"
              >
                <span>{query}</span>
                <X
                  className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveHistory(query);
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cascading Filter */}
      <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
        <Filter className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm font-medium">{t('filterBy')}:</span>
        
        {/* Country Select */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              {selectedCountry ? t(cascaderData[selectedCountry as keyof typeof cascaderData][language === 'JP' ? 'nameJP' : 'nameEN'] as any) : t('selectCountry')}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            <div className="space-y-1">
              {Object.keys(cascaderData).map((country) => (
                <button
                  key={country}
                  onClick={() => {
                    setSelectedCountry(country);
                    setSelectedCity('');
                    setSelectedGenre('');
                  }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-secondary transition-colors text-sm"
                >
                  {language === 'JP' 
                    ? cascaderData[country as keyof typeof cascaderData].nameJP
                    : cascaderData[country as keyof typeof cascaderData].nameEN
                  }
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* City Select */}
        {selectedCountry && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {selectedCity 
                  ? (language === 'JP'
                    ? cascaderData[selectedCountry as keyof typeof cascaderData].cities[selectedCity as keyof typeof cascaderData['japan']['cities']].nameJP
                    : cascaderData[selectedCountry as keyof typeof cascaderData].cities[selectedCity as keyof typeof cascaderData['japan']['cities']].nameEN)
                  : t('selectCity')
                }
                <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="space-y-1">
                {availableCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setSelectedGenre('');
                    }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-secondary transition-colors text-sm"
                  >
                    {language === 'JP'
                      ? cascaderData[selectedCountry as keyof typeof cascaderData].cities[city as keyof typeof cascaderData['japan']['cities']].nameJP
                      : cascaderData[selectedCountry as keyof typeof cascaderData].cities[city as keyof typeof cascaderData['japan']['cities']].nameEN
                    }
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Genre Select */}
        {selectedCity && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {selectedGenre ? t(selectedGenre) : t('selectGenre')}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="space-y-1">
                {availableGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className="w-full text-left px-3 py-2 rounded hover:bg-secondary transition-colors text-sm"
                  >
                    {t(genre)}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Clear Filter */}
        {(selectedCountry || selectedCity || selectedGenre) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedCountry('');
              setSelectedCity('');
              setSelectedGenre('');
            }}
            className="ml-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Main Content Grid - 60/40 Layout */}
      <div className="grid lg:grid-cols-[60%_40%] gap-6">
        {/* Left Column - Video Feed (60%) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2>{t('forYou')}</h2>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="w-full aspect-video rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {mockVideoRecommendations.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer space-y-3 rounded-lg overflow-hidden hover:bg-secondary/30 transition-all p-2"
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-card shadow-lg">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/90 rounded text-xs font-medium">
                      {video.duration}
                    </div>
                    
                    {/* Play Icon on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                    </div>
                    
                    {/* Mute Preview Indicator */}
                    {hoveredVideo === video.id && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-black/90 rounded-full text-xs flex items-center gap-1 animate-in fade-in duration-200">
                        <VolumeX className="w-3 h-3" />
                        <span>{t('mutePreview')}</span>
                      </div>
                    )}
                    
                    {/* Algorithm Badge */}
                    <div className="absolute top-2 left-2 px-3 py-1.5 bg-black/90 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg">
                      {video.badgeType === 'algorithm' && '🎯'}
                      {video.badgeType === 'trending' && '🔥'}
                      {video.badgeType === 'official' && '✓'}
                      <span>
                        {language === 'JP' 
                          ? video.badgeType === 'algorithm' 
                            ? t('basedOnListening')
                            : video.badgeType === 'trending'
                            ? `${t('trendingIn')} ${video.location}`
                            : t('official')
                          : video.badge + (video.location ? ` ${video.location}` : '')
                        }
                      </span>
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="px-1">
                    <h3 className="text-sm line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Trending Ranking (40%) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2>{t('trendingRanking')}</h2>
            {selectedSongs.length > 0 && (
              <Button size="sm" className="gap-2">
                <ListPlus className="w-4 h-4" />
                {t('addToPlaylist')} ({selectedSongs.length})
              </Button>
            )}
          </div>
          
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-12 h-12 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Header with Select All */}
                <div className="flex items-center gap-3 p-3 border-b border-border bg-secondary/50">
                  <Checkbox
                    checked={selectedSongs.length === currentPageSongs.length && currentPageSongs.length > 0}
                    onCheckedChange={handleSelectAllSongs}
                  />
                  <span className="text-sm text-muted-foreground">
                    {selectedSongs.length > 0 
                      ? `${selectedSongs.length} ${t('selectedSongs')}`
                      : t('rank')
                    }
                  </span>
                  {selectedSongs.length > 0 && (
                    <button
                      onClick={() => setSelectedSongs([])}
                      className="ml-auto text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('clearSelection')}
                    </button>
                  )}
                </div>

                {/* Ranking List */}
                <div className="divide-y divide-border">
                  {currentPageSongs.map((song) => (
                    <div
                      key={song.id}
                      className="flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors group"
                    >
                      {/* Checkbox */}
                      <Checkbox
                        checked={selectedSongs.includes(song.id)}
                        onCheckedChange={() => handleSongCheckbox(song.id)}
                        onClick={(e) => e.stopPropagation()}
                      />

                      {/* Rank */}
                      <div className={`w-8 text-center shrink-0 font-bold ${getRankColor(song.rank)}`}>
                        {song.rank}
                      </div>

                      {/* Trend Icon */}
                      <div className="shrink-0">
                        {getTrendIcon(song.trend, song.trendValue)}
                      </div>

                      {/* Cover Image */}
                      <button
                        onClick={() => handleSongClick(song)}
                        className="shrink-0"
                      >
                        <img
                          src={song.coverImage}
                          alt={song.title}
                          className="w-12 h-12 rounded object-cover shadow-md group-hover:shadow-lg transition-shadow"
                        />
                      </button>

                      {/* Song Info */}
                      <button
                        onClick={() => handleSongClick(song)}
                        className="flex-1 min-w-0 text-left"
                      >
                        <div className="flex items-center gap-2">
                          <p className="truncate group-hover:text-primary transition-colors font-medium">
                            {song.title}
                          </p>
                          {song.isTrending && (
                            <span className="text-xs shrink-0">
                              {language === 'JP' ? '🔥' : '🔥'}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(p => Math.max(1, p - 1));
                      }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === page}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(p => Math.min(totalPages, p + 1));
                      }}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </div>
      </div>

      {/* Trending Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2>{t('playlistCategories')}</h2>
        </div>
        
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockTrendingCategories.map((category) => (
              <button
                key={category.id}
                className="group relative h-32 rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80 group-hover:opacity-90 transition-opacity`} />
                {/* Category Name */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 className="text-center text-white drop-shadow-lg">
                    {language === 'JP' ? category.name : category.nameEN}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Song Detail Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          {selectedSong && (
            <div className="p-6 space-y-6 max-w-md mx-auto">
              <DrawerHeader>
                <DrawerTitle>{t('songDetails')}</DrawerTitle>
              </DrawerHeader>
              
              <div className="flex items-start gap-4">
                <img
                  src={selectedSong.coverImage}
                  alt={selectedSong.title}
                  className="w-24 h-24 rounded-lg object-cover shadow-lg"
                />
                <div className="flex-1">
                  <h2 className="mb-1">{selectedSong.title}</h2>
                  <p className="text-muted-foreground">{selectedSong.artist}</p>
                  <div className="mt-3 flex items-center gap-2">
                    {getTrendIcon(selectedSong.trend, selectedSong.trendValue)}
                    <span className="text-sm text-muted-foreground">
                      {selectedSong.trend === 'up' && `↑ ${selectedSong.trendValue}`}
                      {selectedSong.trend === 'down' && `↓ ${selectedSong.trendValue}`}
                      {selectedSong.trend === 'new' && t('trendingNo1')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t('listeners')}</span>
                  <span className="text-primary font-bold text-lg">{selectedSong.matchingUsers.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedSong.matchingUsers} {t('matchingUsers')}
                </p>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
