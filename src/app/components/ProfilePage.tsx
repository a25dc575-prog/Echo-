import { MapPin, Calendar, Edit2, Play, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockUserProfile } from '../data/mockData';
import { Avatar } from './Avatar';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export function ProfilePage() {
  const { t } = useLanguage();
  const profile = mockUserProfile;

  // Transform genre distribution for Recharts
  const chartData = profile.genreDistribution.map((genre) => ({
    name: genre.genre,
    value: genre.percentage,
    color: genre.color,
  }));

  // Format stats display
  const stats = [
    { label: t('totalTracks'), value: profile.stats.totalTracks.toLocaleString() },
    { label: t('listeningHours'), value: `${profile.stats.totalListeningHours.toLocaleString()}h` },
    { label: t('favoriteArtists'), value: profile.stats.favoriteArtists.toLocaleString() },
    { label: t('followers'), value: profile.stats.followers.toLocaleString() },
    { label: t('following'), value: profile.stats.following.toLocaleString() },
  ];

  return (
    <div className="space-y-0">
      {/* Cover Image Section */}
      <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
        <img
          src={profile.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Edit Button */}
        <button className="absolute top-4 right-4 px-4 py-2 bg-card/80 backdrop-blur-sm hover:bg-card border border-border rounded-lg flex items-center gap-2 transition-colors">
          <Edit2 className="w-4 h-4" />
          <span>{t('editProfile')}</span>
        </button>
      </div>

      {/* Profile Info Section */}
      <div className="bg-card border-x border-border px-6 md:px-8 pt-0 pb-8">
        {/* Avatar & Basic Info */}
        <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 md:-mt-20">
          {/* Avatar */}
          <div className="relative">
            <Avatar
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 md:w-40 md:h-40 border-4 border-card bg-card overflow-hidden"
            />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary border-4 border-card flex items-center justify-center">
              <span className="text-xl">🎵</span>
            </div>
          </div>

          {/* Name & Bio */}
          <div className="flex-1 md:mb-4">
            <h1 className="mb-1">{profile.name}</h1>
            <p className="text-muted-foreground mb-3">{profile.username}</p>
            <p className="text-foreground/90 max-w-2xl">{profile.bio}</p>
            
            {/* Location & Join Date */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{t('joinedOn')} {new Date(profile.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-background rounded-lg p-4 border border-border text-center"
            >
              <div className="text-2xl md:text-3xl font-semibold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid lg:grid-cols-2 gap-6 px-6 md:px-8 py-8 bg-background">
        {/* Genre Distribution Chart */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="mb-6">{t('genreDistribution')}</h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                  labelLine={true}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `${value}%`}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Genre List */}
          <div className="mt-6 space-y-3">
            {profile.genreDistribution.map((genre) => (
              <div key={genre.genre} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: genre.color }}
                  />
                  <span>{genre.genre}</span>
                </div>
                <span className="text-muted-foreground">{genre.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Liked Music */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>{t('likedMusic')}</h3>
            <button className="text-primary hover:underline">
              {t('viewAll')}
            </button>
          </div>

          <div className="space-y-3">
            {profile.likedTracks.map((track) => (
              <div
                key={track.id}
                className="group flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                {/* Cover Image */}
                <div className="relative flex-shrink-0">
                  <img
                    src={track.coverImage}
                    alt={track.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" fill="white" />
                  </div>
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="truncate mb-1">{track.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {track.artist} • {track.album}
                  </p>
                </div>

                {/* Duration & Play Count */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-sm text-muted-foreground">{track.duration}</span>
                  {track.playCount && (
                    <span className="text-xs text-muted-foreground">
                      {track.playCount} {t('plays')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Played Section */}
      <div className="px-6 md:px-8 pb-8 bg-background">
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>{t('recentlyPlayed')}</h3>
            <button className="text-primary hover:underline">
              {t('viewAll')}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {profile.recentlyPlayed.map((track) => (
              <div
                key={track.id}
                className="group bg-background hover:bg-secondary/50 border border-border rounded-lg p-4 transition-colors cursor-pointer"
              >
                {/* Cover Image */}
                <div className="relative mb-3">
                  <img
                    src={track.coverImage}
                    alt={track.title}
                    className="w-full aspect-square rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Track Info */}
                <h4 className="truncate mb-1">{track.title}</h4>
                <p className="text-sm text-muted-foreground truncate mb-2">
                  {track.artist}
                </p>

                {/* Last Played */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{track.lastPlayed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}