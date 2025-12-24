export interface User {
  id: string;
  name: string;
  avatar: string;
  musicTags: string[];
  matchPercentage: number;
  commonArtists: string[];
  isOnline: boolean;
  interests?: string[];
  location?: string;
  age?: number;
}

export interface Playlist {
  id: string;
  name: string;
  coverImage: string;
  trackCount: number;
  similarity?: number;
}

export interface Concert {
  id: string;
  artist: string;
  title: string;
  date: string;
  venue: string;
  location: string;
  image: string;
  interestedCount: number;
  attendingUsers: User[];
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  sender?: 'me' | 'them';
  musicShare?: {
    title: string;
    artist: string;
    cover: string;
    type: 'track' | 'playlist' | 'album';
  };
  musicCard?: {
    title: string;
    artist: string;
    coverImage: string;
  };
}

export interface ChatConversation {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Yuki Tanaka',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    musicTags: ["70's City Pop", 'Jazz', 'Anime OST'],
    matchPercentage: 94,
    commonArtists: ['Vaundy', 'Yoasobi', 'King Gnu'],
    isOnline: true,
    interests: ['Traveling', 'Photography'],
    location: 'Tokyo, Japan',
    age: 28,
  },
  {
    id: '2',
    name: 'Haruto Sato',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    musicTags: ['J-Rock', 'Visual Kei', 'Alternative'],
    matchPercentage: 91,
    commonArtists: ['ONE OK ROCK', 'MY FIRST STORY'],
    isOnline: true,
    interests: ['Gaming', 'Cooking'],
    location: 'Osaka, Japan',
    age: 25,
  },
  {
    id: '3',
    name: 'Aiko Yamamoto',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    musicTags: ['K-Pop', 'J-Pop', 'Electronic'],
    matchPercentage: 88,
    commonArtists: ['Perfume', 'Kyary Pamyu Pamyu'],
    isOnline: false,
    interests: ['Reading', 'Hiking'],
    location: 'Kyoto, Japan',
    age: 30,
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: 'p1',
    name: 'Tokyo Nights',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    trackCount: 42,
    similarity: 85,
  },
  {
    id: 'p2',
    name: 'Morning Commute',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    trackCount: 28,
    similarity: 79,
  },
  {
    id: 'p3',
    name: 'Chill Vibes',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    trackCount: 35,
    similarity: 92,
  },
  {
    id: 'p4',
    name: 'Workout Energy',
    coverImage: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    trackCount: 31,
    similarity: 67,
  },
];

export const mockConcerts: Concert[] = [
  {
    id: 'c1',
    artist: 'Yoasobi',
    title: 'YOASOBI TOUR 2025',
    date: '2025-03-15',
    venue: '東京ドーム',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=400&fit=crop',
    interestedCount: 234,
    attendingUsers: [mockUsers[0], mockUsers[1]],
  },
  {
    id: 'c2',
    artist: 'King Gnu',
    title: 'CEREMONY TOUR',
    date: '2025-04-20',
    venue: '大阪城ホール',
    location: 'Osaka, Japan',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=400&fit=crop',
    interestedCount: 189,
    attendingUsers: [mockUsers[1], mockUsers[2]],
  },
  {
    id: 'c3',
    artist: 'Vaundy',
    title: 'STROBO Live',
    date: '2025-05-10',
    venue: '武道館',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop',
    interestedCount: 312,
    attendingUsers: [mockUsers[0], mockUsers[2]],
  },
];

export const mockConversations: ChatConversation[] = [
  {
    id: 'conv1',
    user: mockUsers[0],
    lastMessage: 'そのライブ行く予定ですか？',
    timestamp: '2m ago',
    unread: 2,
  },
  {
    id: 'conv2',
    user: mockUsers[1],
    lastMessage: 'Thanks for the recommendation!',
    timestamp: '1h ago',
    unread: 0,
  },
  {
    id: 'conv3',
    user: mockUsers[2],
    lastMessage: 'Love that playlist! 💚',
    timestamp: '3h ago',
    unread: 0,
  },
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    userId: '1',
    userName: 'Yuki Tanaka',
    text: "Yo! Check this track out! It's exactly the vibe of one of our both fave on Music Radar. 👀",
    timestamp: '10:34 AM',
    sender: 'them',
    isRead: true,
  },
  {
    id: 'm2',
    userId: '1',
    userName: 'Yuki Tanaka',
    text: '',
    timestamp: '10:34 AM',
    sender: 'them',
    isRead: true,
    musicShare: {
      title: '怪獣の花唄',
      artist: 'Vaundy • Strobo Playlist',
      cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&h=100&fit=crop',
      type: 'playlist',
    },
  },
  {
    id: 'm3',
    userId: 'me',
    userName: 'Me',
    text: "Hey… this is fire 🔥",
    timestamp: '11:02 AM',
    sender: 'me',
    isRead: true,
  },
  {
    id: 'm4',
    userId: 'me',
    userName: 'Me',
    text: "I've been listening to this on loop since you sent it. We should definitely catch his next live together!",
    timestamp: '11:03 AM',
    sender: 'me',
    isRead: true,
  },
  {
    id: 'm5',
    userId: '1',
    userName: 'Yuki Tanaka',
    text: "Totally! I'm planning to go to his Tokyo show. Let's make it happen. 🎸",
    timestamp: '11:09 PM',
    sender: 'them',
    isRead: true,
  },
];

export const musicGeneData = [
  { genre: 'Rock', value: 40 },
  { genre: 'Jazz', value: 30 },
  { genre: 'Pop', value: 50 },
  { genre: 'Electronic', value: 35 },
  { genre: 'Classical', value: 20 },
];

// User Profile Data
export interface Track {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  album: string;
  duration: string;
  playCount?: number;
  lastPlayed?: string;
}

export interface GenreDistribution {
  genre: string;
  percentage: number;
  color: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  joinDate: string;
  stats: {
    totalTracks: number;
    totalListeningHours: number;
    favoriteArtists: number;
    followers: number;
    following: number;
  };
  genreDistribution: GenreDistribution[];
  likedTracks: Track[];
  recentlyPlayed: Track[];
}

export const mockUserProfile: UserProfile = {
  id: 'me',
  name: 'TENG KAI CHIEN',
  username: '@tengkaichien',
  avatar: 'icon:user', // Using icon instead of image
  coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=400&fit=crop',
  bio: '音楽は人生の soundtrack 🎵 | Tokyo-based music lover | Always discovering new sounds',
  location: 'Tokyo, Japan',
  joinDate: '2023-03-15',
  stats: {
    totalTracks: 1247,
    totalListeningHours: 3892,
    favoriteArtists: 156,
    followers: 892,
    following: 634,
  },
  genreDistribution: [
    { genre: 'J-Pop', percentage: 28, color: '#17D1C1' },
    { genre: 'Electronic', percentage: 22, color: '#8B5CF6' },
    { genre: 'Rock', percentage: 18, color: '#F59E0B' },
    { genre: 'Jazz', percentage: 15, color: '#EC4899' },
    { genre: 'Indie', percentage: 10, color: '#10B981' },
    { genre: 'Classical', percentage: 7, color: '#3B82F6' },
  ],
  likedTracks: [
    {
      id: 'lt1',
      title: 'Bling-Bang-Bang-Born',
      artist: 'Creepy Nuts',
      album: 'Single',
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop',
      duration: '3:24',
      playCount: 247,
    },
    {
      id: 'lt2',
      title: 'Idol',
      artist: 'YOASOBI',
      album: 'THE BOOK 3',
      coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop',
      duration: '3:20',
      playCount: 312,
    },
    {
      id: 'lt3',
      title: 'NIGHT DANCER',
      artist: 'imase',
      album: 'Single',
      coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop',
      duration: '2:58',
      playCount: 198,
    },
    {
      id: 'lt4',
      title: 'Subtitle',
      artist: 'Official髭男dism',
      album: 'Editorial',
      coverImage: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=100&h=100&fit=crop',
      duration: '4:15',
      playCount: 156,
    },
    {
      id: 'lt5',
      title: '怪獣の花唄',
      artist: 'Vaundy',
      album: 'strobo',
      coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&h=100&fit=crop',
      duration: '3:45',
      playCount: 223,
    },
  ],
  recentlyPlayed: [
    {
      id: 'rp1',
      title: 'Souvenir',
      artist: 'BUMP OF CHICKEN',
      album: 'aurora arc',
      coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop',
      duration: '4:32',
      lastPlayed: '2 minutes ago',
    },
    {
      id: 'rp2',
      title: 'KICK BACK',
      artist: '米津玄師',
      album: 'KICK BACK',
      coverImage: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=100&h=100&fit=crop',
      duration: '3:18',
      lastPlayed: '15 minutes ago',
    },
    {
      id: 'rp3',
      title: 'Flowers',
      artist: 'Miley Cyrus',
      album: 'Endless Summer Vacation',
      coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
      duration: '3:20',
      lastPlayed: '1 hour ago',
    },
    {
      id: 'rp4',
      title: 'Butter',
      artist: 'BTS',
      album: 'Butter',
      coverImage: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=100&h=100&fit=crop',
      duration: '2:44',
      lastPlayed: '2 hours ago',
    },
  ],
};

// Search Page Data
export interface RankingSong {
  id: string;
  rank: number;
  title: string;
  artist: string;
  coverImage: string;
  trend: 'up' | 'down' | 'new' | 'same';
  trendValue?: number;
  matchingUsers: number;
  isTrending?: boolean;
}

export interface VideoRecommendation {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  badge: string;
  badgeType: 'algorithm' | 'trending' | 'official';
  location?: string;
}

export interface TrendingCategory {
  id: string;
  name: string;
  nameEN: string;
  gradient: string;
  image: string;
}

export const mockRankingSongs: RankingSong[] = [
  {
    id: 'r1',
    rank: 1,
    title: 'Bling-Bang-Bang-Born',
    artist: 'Creepy Nuts',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop',
    trend: 'new',
    matchingUsers: 1284,
    isTrending: true,
  },
  {
    id: 'r2',
    rank: 2,
    title: 'Idol',
    artist: 'YOASOBI',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop',
    trend: 'up',
    trendValue: 3,
    matchingUsers: 2156,
  },
  {
    id: 'r3',
    rank: 3,
    title: 'Flowers',
    artist: 'Miley Cyrus',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    trend: 'down',
    trendValue: 1,
    matchingUsers: 1892,
  },
  {
    id: 'r4',
    rank: 4,
    title: 'NIGHT DANCER',
    artist: 'imase',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop',
    trend: 'up',
    trendValue: 2,
    matchingUsers: 1567,
  },
  {
    id: 'r5',
    rank: 5,
    title: 'Subtitle',
    artist: 'Official髭男dism',
    coverImage: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=100&h=100&fit=crop',
    trend: 'same',
    matchingUsers: 1423,
  },
  {
    id: 'r6',
    rank: 6,
    title: 'KICK BACK',
    artist: '米津玄師',
    coverImage: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=100&h=100&fit=crop',
    trend: 'up',
    trendValue: 4,
    matchingUsers: 1298,
  },
  {
    id: 'r7',
    rank: 7,
    title: 'アイドル',
    artist: 'YOASOBI',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    trend: 'down',
    trendValue: 2,
    matchingUsers: 1187,
  },
  {
    id: 'r8',
    rank: 8,
    title: 'Souvenir',
    artist: 'BUMP OF CHICKEN',
    coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop',
    trend: 'same',
    matchingUsers: 1045,
  },
  {
    id: 'r9',
    rank: 9,
    title: '怪獣の花唄',
    artist: 'Vaundy',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&h=100&fit=crop',
    trend: 'up',
    trendValue: 1,
    matchingUsers: 987,
  },
  {
    id: 'r10',
    rank: 10,
    title: 'Butter',
    artist: 'BTS',
    coverImage: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=100&h=100&fit=crop',
    trend: 'down',
    trendValue: 3,
    matchingUsers: 856,
  },
];

export const mockVideoRecommendations: VideoRecommendation[] = [
  {
    id: 'v1',
    title: 'YOASOBI - Live at Tokyo Dome 2025 (Official Video)',
    thumbnail: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=225&fit=crop',
    duration: '03:45',
    badge: 'Based on your listening',
    badgeType: 'algorithm',
  },
  {
    id: 'v2',
    title: 'Vaundy - 怪獣の花唄 Studio Live Session',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=225&fit=crop',
    duration: '04:12',
    badge: 'Trending in',
    badgeType: 'trending',
    location: 'Tokyo',
  },
  {
    id: 'v3',
    title: 'Behind The Scenes: Taylor Swift Eras Tour',
    thumbnail: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=225&fit=crop',
    duration: '12:30',
    badge: 'Official',
    badgeType: 'official',
  },
  {
    id: 'v4',
    title: 'King Gnu - CEREMONY Tour Documentary',
    thumbnail: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=225&fit=crop',
    duration: '08:15',
    badge: 'Based on your listening',
    badgeType: 'algorithm',
  },
  {
    id: 'v5',
    title: 'Creepy Nuts - Bling-Bang-Bang-Born Dance Challenge',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=225&fit=crop',
    duration: '02:58',
    badge: 'Trending in',
    badgeType: 'trending',
    location: 'Worldwide',
  },
  {
    id: 'v6',
    title: '米津玄師 - KICK BACK Official MV',
    thumbnail: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=225&fit=crop',
    duration: '03:25',
    badge: 'Official',
    badgeType: 'official',
  },
];

export const mockTrendingCategories: TrendingCategory[] = [
  {
    id: 'cat1',
    name: '2025 日本最夯',
    nameEN: 'Japan Top 2025',
    gradient: 'from-purple-600 to-pink-600',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=150&fit=crop',
  },
  {
    id: 'cat2',
    name: '欧米流行榜',
    nameEN: 'Western Pop Hits',
    gradient: 'from-blue-600 to-cyan-600',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=150&fit=crop',
  },
  {
    id: 'cat3',
    name: 'TikTok 爆紅',
    nameEN: 'TikTok Viral',
    gradient: 'from-pink-600 to-rose-600',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=150&fit=crop',
  },
  {
    id: 'cat4',
    name: '動漫熱歌榜',
    nameEN: 'Anime Hits',
    gradient: 'from-orange-600 to-red-600',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&h=150&fit=crop',
  },
];

// Explore Page Data
export const mockExploreUsers: User[] = [
  {
    id: 'e1',
    name: 'Sakura Matsumoto',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    musicTags: ['J-Pop', 'Indie', 'Electronic'],
    matchPercentage: 96,
    commonArtists: ['Vaundy', 'Ado', 'Kenshi Yonezu'],
    isOnline: true,
    interests: ['Photography', 'Coffee', 'Film'],
    location: 'Tokyo',
    age: 26,
  },
  {
    id: 'e2',
    name: 'Riku Nakamura',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
    musicTags: ['Rock', 'Alternative', 'Punk'],
    matchPercentage: 93,
    commonArtists: ['ONE OK ROCK', 'Coldrain'],
    isOnline: true,
    interests: ['Gaming', 'Camping', 'Skateboarding'],
    location: 'Osaka',
    age: 24,
  },
  {
    id: 'e3',
    name: 'Hana Suzuki',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
    musicTags: ['Jazz', 'Soul', 'R&B'],
    matchPercentage: 91,
    commonArtists: ['Norah Jones', 'Joji'],
    isOnline: false,
    interests: ['Reading', 'Cooking', 'Yoga'],
    location: 'Kyoto',
    age: 29,
  },
  {
    id: 'e4',
    name: 'Kaito Yamada',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    musicTags: ['Hip-Hop', 'Trap', 'EDM'],
    matchPercentage: 89,
    commonArtists: ['Tohji', 'JP THE WAVY'],
    isOnline: true,
    interests: ['Art', 'Fashion', 'Dancing'],
    location: 'Tokyo',
    age: 27,
  },
  {
    id: 'e5',
    name: 'Mio Tanaka',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
    musicTags: ['K-Pop', 'J-Pop', 'Dance'],
    matchPercentage: 87,
    commonArtists: ['BTS', 'TWICE', 'NewJeans'],
    isOnline: true,
    interests: ['Travel', 'Photography', 'Skincare'],
    location: 'Tokyo',
    age: 23,
  },
  {
    id: 'e6',
    name: 'Sota Kobayashi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    musicTags: ['Metal', 'Visual Kei', 'Rock'],
    matchPercentage: 85,
    commonArtists: ['DIR EN GREY', 'BABYMETAL'],
    isOnline: false,
    interests: ['Anime', 'Drawing', 'Concerts'],
    location: 'Nagoya',
    age: 25,
  },
  {
    id: 'e7',
    name: 'Yui Fujiwara',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop',
    musicTags: ['Classical', 'Piano', 'Soundtrack'],
    matchPercentage: 84,
    commonArtists: ['Ryuichi Sakamoto', 'Joe Hisaishi'],
    isOnline: true,
    interests: ['Piano', 'Tea', 'Museums'],
    location: 'Tokyo',
    age: 31,
  },
  {
    id: 'e8',
    name: 'Takumi Ishida',
    avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=500&fit=crop',
    musicTags: ['Electronic', 'House', 'Techno'],
    matchPercentage: 82,
    commonArtists: ['ODESZA', 'Porter Robinson'],
    isOnline: true,
    interests: ['DJing', 'Nightlife', 'Tech'],
    location: 'Tokyo',
    age: 28,
  },
  {
    id: 'e9',
    name: 'Akane Watanabe',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
    musicTags: ['Indie', 'Folk', 'Acoustic'],
    matchPercentage: 80,
    commonArtists: ['Chet Faker', 'Ben Howard'],
    isOnline: false,
    interests: ['Writing', 'Hiking', 'Coffee'],
    location: 'Fukuoka',
    age: 26,
  },
];