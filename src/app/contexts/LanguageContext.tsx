import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'JP' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  JP: {
    // Navigation
    home: 'ホーム',
    matches: 'マッチング',
    concerts: 'ライブ',
    chat: 'チャット',
    profile: 'プロフィール',
    search: '検索',
    explore: '探索',
    
    // Resonance Hub
    resonanceHub: '共鳴中心',
    musicGene: '音楽遺伝子',
    bestMatch: '今日の最匹配',
    bothLike: '共通の好み',
    similarity: '相似度',
    viewProfile: 'プロフィール見る',
    startChat: 'チャット開始',
    
    // Playlists
    myPlaylists: '私の歌単',
    recommendedPlaylists: '推薦歌単',
    similarTo: 'あなたと',
    similar: '相似',
    
    // Concerts
    upcomingConcerts: '今後のライブ',
    buyTicket: 'チケット購入',
    interested: '興味あり',
    whoGoing: '誰が行く？',
    joinGroupChat: 'グループチャット参加',
    concertDate: '日付',
    venue: '会場',
    
    // Chat
    read: '既読',
    online: 'オンライン',
    offline: 'オフライン',
    typing: '入力中...',
    sendMessage: 'メッセージを送信',
    chatPlaceholder: 'メッセージを入力...',
    echoYourThoughts: 'あなたの想いをEcho...',
    messages: 'メッセージ',
    searchConversations: '会話を検索...',
    endOfHistory: '履歴の終わり',
    justNow: 'たった今',
    
    // Empty States
    analyzingMusic: 'あなたの音楽を分析中...',
    noMatches: 'まだマッチがありません',
    
    // Settings
    locationMatching: '位置情報マッチング',
    nearby: '近く',
    
    // Search Page
    searchPlaceholder: '歌手、曲名、イベントを検索',
    recentSearches: '最近の検索',
    clearHistory: '履歴を消去',
    trendingRanking: '急上昇チャート',
    forYou: 'あなたのために',
    rank: '順位',
    trend: 'トレンド',
    listeners: 'リスナー',
    trendingNo1: '🔥 急上昇 No.1',
    japanTop2025: '2025 日本最夯',
    westernPop: '欧米流行榜',
    tiktokViral: 'TikTok 爆紅',
    animeHits: '動漫熱歌榜',
    basedOnListening: 'あなたの視聴履歴に基づく',
    trendingIn: 'トレンド:',
    noResults: '検索結果が見つかりません',
    emptySearchMessage: 'お探しの曲が見つかりませんでした',
    tryDifferentKeywords: '別のキーワードをお試しください',
    playlistCategories: '人気カテゴリー',
    matchingUsers: '人のユーザーが聴いています',
    official: '公式',
    live: 'ライブ',
    behind: '舞台裏',
    videoDuration: '分',
    songDetails: '曲の詳細',
    filterBy: 'フィルター',
    country: '国',
    city: '都市',
    genre: 'ジャンル',
    selectCountry: '国を選択',
    selectCity: '都市を選択',
    selectGenre: 'ジャンルを選択',
    japan: '日本',
    usa: 'アメリカ',
    korea: '韓国',
    tokyo: '東京',
    osaka: '大阪',
    newYork: 'ニューヨーク',
    losAngeles: 'ロサンゼルス',
    seoul: 'ソウル',
    busan: '釜山',
    jPop: 'J-Pop',
    jRock: 'J-Rock',
    pop: 'ポップ',
    rock: 'ロック',
    kPop: 'K-Pop',
    hiphop: 'ヒップホップ',
    selectedSongs: '曲を選択しました',
    addToPlaylist: 'プレイリストに追加',
    clearSelection: '選択をクリア',
    confirmClearHistory: '検索履歴をすべて削除しますか？',
    confirm: '確認',
    cancel: 'キャンセル',
    page: 'ページ',
    of: '/',
    previous: '前へ',
    next: '次へ',
    calculatingMatches: 'マッチングを計算中...',
    hoverToPreview: 'ホバーでプレビュー',
    mutePreview: '静音プレビュー',
    
    // Theme
    lightMode: 'ライトモード',
    darkMode: 'ダークモード',
    toggleTheme: 'テーマ切替',
    
    // Profile Page
    myProfile: 'マイプロフィール',
    editProfile: '編集',
    followers: 'フォロワー',
    following: 'フォロー中',
    totalTracks: '総トラック数',
    listeningHours: '再生時間',
    favoriteArtists: 'お気に入りアーティスト',
    likedMusic: 'いいね！した音楽',
    recentlyPlayed: '最近再生した',
    genreDistribution: '音楽ジャンル分布',
    playCount: '再生回数',
    plays: 'plays',
    viewAll: 'View All',
    joinedOn: 'Joined on',
    
    // Explore Page
    exploreMatches: 'Explore Matches',
    onlineNow: 'Online Now',
    peopleOnline: 'people online',
    filters: 'Filters',
    matchRate: 'Match Rate',
    distance: 'Distance',
    interests: 'Interests',
    sendWave: 'Send Wave',
    like: 'Like',
    away: 'km away',
    yearsOld: 'years old',
  },
  EN: {
    // Navigation
    home: 'Home',
    matches: 'Matches',
    concerts: 'Concerts',
    chat: 'Chat',
    profile: 'Profile',
    search: 'Search',
    explore: 'Explore',
    
    // Resonance Hub
    resonanceHub: 'Resonance Hub',
    musicGene: 'Music Gene',
    bestMatch: 'Best Match Today',
    bothLike: 'Both like',
    similarity: 'Similarity',
    viewProfile: 'View Profile',
    startChat: 'Start Chat',
    
    // Playlists
    myPlaylists: 'My Playlists',
    recommendedPlaylists: 'Recommended Playlists',
    similarTo: 'Similar to you',
    similar: 'similar',
    
    // Concerts
    upcomingConcerts: 'Upcoming Concerts',
    buyTicket: 'Buy Ticket',
    interested: 'Interested',
    whoGoing: 'Who\'s Going?',
    joinGroupChat: 'Join Group Chat',
    concertDate: 'Date',
    venue: 'Venue',
    
    // Chat
    read: 'Read',
    online: 'Online',
    offline: 'Offline',
    typing: 'Typing...',
    sendMessage: 'Send Message',
    chatPlaceholder: 'Type a message...',
    echoYourThoughts: 'Echo your thoughts...',
    messages: 'Messages',
    searchConversations: 'Search conversations...',
    endOfHistory: 'End of history',
    justNow: 'Just now',
    
    // Empty States
    analyzingMusic: 'Analyzing your music...',
    noMatches: 'No matches yet',
    
    // Settings
    locationMatching: 'Location Matching',
    nearby: 'Nearby',
    
    // Search Page
    searchPlaceholder: 'Search artists, songs, events',
    recentSearches: 'Recent Searches',
    clearHistory: 'Clear History',
    trendingRanking: 'Trending Chart',
    forYou: 'For You',
    rank: 'Rank',
    trend: 'Trend',
    listeners: 'Listeners',
    trendingNo1: '🔥 Trending No.1',
    japanTop2025: 'Japan Top 2025',
    westernPop: 'Western Pop Hits',
    tiktokViral: 'TikTok Viral',
    animeHits: 'Anime Hits',
    basedOnListening: 'Based on your listening',
    trendingIn: 'Trending in',
    noResults: 'No search results found',
    emptySearchMessage: 'We couldn\'t find what you\'re looking for',
    tryDifferentKeywords: 'Try different keywords',
    playlistCategories: 'Popular Categories',
    matchingUsers: 'users are listening',
    official: 'Official',
    live: 'Live',
    behind: 'Behind the Scenes',
    videoDuration: 'min',
    songDetails: 'Song Details',
    filterBy: 'Filter By',
    country: 'Country',
    city: 'City',
    genre: 'Genre',
    selectCountry: 'Select Country',
    selectCity: 'Select City',
    selectGenre: 'Select Genre',
    japan: 'Japan',
    usa: 'USA',
    korea: 'Korea',
    tokyo: 'Tokyo',
    osaka: 'Osaka',
    newYork: 'New York',
    losAngeles: 'Los Angeles',
    seoul: 'Seoul',
    busan: 'Busan',
    jPop: 'J-Pop',
    jRock: 'J-Rock',
    pop: 'Pop',
    rock: 'Rock',
    kPop: 'K-Pop',
    hiphop: 'Hip-Hop',
    selectedSongs: 'songs selected',
    addToPlaylist: 'Add to Playlist',
    clearSelection: 'Clear Selection',
    confirmClearHistory: 'Are you sure you want to clear all search history?',
    confirm: 'Confirm',
    cancel: 'Cancel',
    page: 'Page',
    of: 'of',
    previous: 'Previous',
    next: 'Next',
    calculatingMatches: 'Calculating matches...',
    hoverToPreview: 'Hover to preview',
    mutePreview: 'Muted preview',
    
    // Theme
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    toggleTheme: 'Toggle Theme',
    
    // Profile Page
    myProfile: 'My Profile',
    editProfile: 'Edit',
    followers: 'Followers',
    following: 'Following',
    totalTracks: 'Total Tracks',
    listeningHours: 'Listening Hours',
    favoriteArtists: 'Favorite Artists',
    likedMusic: 'Liked Music',
    recentlyPlayed: 'Recently Played',
    genreDistribution: 'Genre Distribution',
    playCount: 'Play Count',
    plays: 'plays',
    viewAll: 'View All',
    joinedOn: 'Joined on',
    
    // Explore Page
    exploreMatches: 'Explore Matches',
    onlineNow: 'Online Now',
    peopleOnline: 'people online',
    filters: 'Filters',
    matchRate: 'Match Rate',
    distance: 'Distance',
    interests: 'Interests',
    sendWave: 'Send Wave',
    like: 'Like',
    away: 'km away',
    yearsOld: 'years old',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('JP');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.JP] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}