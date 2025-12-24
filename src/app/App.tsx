import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { LanguageToggle } from './components/LanguageToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { MusicRadar } from './components/MusicRadar';
import { MatchCard } from './components/MatchCard';
import { PlaylistGrid } from './components/PlaylistGrid';
import { ConcertCard } from './components/ConcertCard';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatRoom } from './components/ChatRoom';
import { ConcertDetail } from './components/ConcertDetail';
import { EmptyState } from './components/EmptyState';
import { MusicTagsFilter } from './components/MusicTagsFilter';
import { LocationMatchToggle } from './components/LocationMatchToggle';
import { SearchPage } from './components/SearchPage';
import { ProfilePage } from './components/ProfilePage';
import { ExplorePage } from './components/ExplorePage';
import { Menu, X } from 'lucide-react';
import { 
  mockUsers, 
  mockPlaylists, 
  mockConcerts, 
  mockConversations, 
  mockMessages,
  Concert 
} from './data/mockData';
import { useLanguage } from './contexts/LanguageContext';

function EchoApp() {
  const [activeView, setActiveView] = useState('home');
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv1');
  const [isLoading, setIsLoading] = useState(true);
  const [showChatSidebar, setShowChatSidebar] = useState(false);
  const [locationMatchEnabled, setLocationMatchEnabled] = useState(false);
  const [selectedMusicTags, setSelectedMusicTags] = useState<string[]>([]);
  const { t } = useLanguage();

  // All available music tags
  const allMusicTags = ["70's City Pop", 'Jazz', 'Anime OST', 'J-Rock', 'Visual Kei', 'Alternative', 'K-Pop', 'J-Pop', 'Electronic'];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleTagToggle = (tag: string) => {
    setSelectedMusicTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Filter users by selected tags
  const filteredUsers = selectedMusicTags.length > 0
    ? mockUsers.filter(user => 
        user.musicTags.some(tag => selectedMusicTags.includes(tag))
      )
    : mockUsers;

  const activeConversation = mockConversations.find(c => c.id === activeConversationId);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content Area */}
      <div className="ml-20 flex relative">
        {/* Center Content */}
        <div className="flex-1 min-h-screen">
          {/* Top Bar */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 md:px-8 py-4 flex items-center justify-between">
            <h1>Echo</h1>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <ThemeToggle />
              {activeView !== 'chat' && (
                <button
                  onClick={() => setShowChatSidebar(!showChatSidebar)}
                  className="lg:hidden w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                >
                  {showChatSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-4 md:px-8 py-6">
            {activeView === 'home' && (
              <div className="space-y-8">
                {/* Resonance Hub Section */}
                <section>
                  <h2 className="mb-6">{t('resonanceHub')}</h2>
                  
                  {isLoading ? (
                    <EmptyState />
                  ) : (
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Music Radar */}
                      <MusicRadar />
                      
                      {/* Best Matches */}
                      <div>
                        <h3 className="mb-4">{t('bestMatch')}</h3>
                        <div className="space-y-4">
                          {mockUsers.slice(0, 2).map((user) => (
                            <MatchCard
                              key={user.id}
                              user={user}
                              onStartChat={() => {
                                setActiveView('chat');
                                setActiveConversationId('conv1');
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </section>

                {/* Playlists Section */}
                <section>
                  <PlaylistGrid
                    playlists={mockPlaylists}
                    title={t('recommendedPlaylists')}
                  />
                </section>

                {/* Concerts Section */}
                <section>
                  <h2 className="mb-6">{t('upcomingConcerts')}</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockConcerts.map((concert) => (
                      <ConcertCard
                        key={concert.id}
                        concert={concert}
                        onViewDetails={() => setSelectedConcert(concert)}
                      />
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeView === 'matches' && (
              <div className="space-y-8">
                <div className="flex flex-col gap-4 mb-6">
                  <h2>{t('bestMatch')}</h2>
                  
                  {/* Location Match Toggle */}
                  <LocationMatchToggle
                    enabled={locationMatchEnabled}
                    onToggle={setLocationMatchEnabled}
                  />
                  
                  {/* Music Tags Filter */}
                  <div>
                    <h3 className="mb-3">Filter by Music Tags</h3>
                    <MusicTagsFilter
                      tags={allMusicTags}
                      selectedTags={selectedMusicTags}
                      onTagToggle={handleTagToggle}
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUsers.map((user) => (
                    <MatchCard
                      key={user.id}
                      user={user}
                      onStartChat={() => {
                        setActiveView('chat');
                        setActiveConversationId('conv1');
                      }}
                    />
                  ))}
                </div>
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">{t('noMatches')}</p>
                  </div>
                )}
              </div>
            )}

            {activeView === 'concerts' && (
              <div className="space-y-8">
                <h2 className="mb-6">{t('upcomingConcerts')}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockConcerts.map((concert) => (
                    <ConcertCard
                      key={concert.id}
                      concert={concert}
                      onViewDetails={() => setSelectedConcert(concert)}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeView === 'chat' && activeConversation && (
              <div className="h-[calc(100vh-120px)]">
                <ChatRoom
                  user={activeConversation.user}
                  messages={mockMessages}
                  onSendMessage={(text) => console.log('Send:', text)}
                />
              </div>
            )}

            {activeView === 'profile' && (
              <div className="space-y-8">
                <ProfilePage />
              </div>
            )}

            {activeView === 'search' && (
              <div className="space-y-8">
                <SearchPage />
              </div>
            )}

            {activeView === 'explore' && (
              <div className="space-y-8">
                <ExplorePage />
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Chat */}
        <div className={`
          fixed lg:relative top-0 right-0 h-screen z-20
          transition-transform duration-300
          ${showChatSidebar || activeView === 'chat' ? 'translate-x-0' : 'translate-x-full'}
          ${activeView !== 'chat' ? 'lg:translate-x-0' : 'hidden'}
        `}>
          <ChatSidebar
            conversations={mockConversations}
            activeConversationId={activeConversationId}
            onSelectConversation={(id) => {
              setActiveConversationId(id);
              setActiveView('chat');
              setShowChatSidebar(false);
            }}
          />
        </div>

        {/* Overlay for mobile */}
        {showChatSidebar && (
          <div
            className="fixed inset-0 bg-black/50 z-10 lg:hidden"
            onClick={() => setShowChatSidebar(false)}
          />
        )}
      </div>

      {/* Concert Detail Modal */}
      {selectedConcert && (
        <ConcertDetail
          concert={selectedConcert}
          onClose={() => setSelectedConcert(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <EchoApp />
      </ThemeProvider>
    </LanguageProvider>
  );
}