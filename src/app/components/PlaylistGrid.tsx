import { Link2, Play } from 'lucide-react';
import { Playlist } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

interface PlaylistGridProps {
  playlists: Playlist[];
  title: string;
}

export function PlaylistGrid({ playlists, title }: PlaylistGridProps) {
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="mb-4">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="group relative bg-card rounded-lg p-4 hover:bg-secondary transition-colors cursor-pointer"
          >
            {playlist.similarity && (
              <div className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs">
                <Link2 className="w-3 h-3" />
                {playlist.similarity}%
              </div>
            )}
            
            <div className="relative mb-3">
              <img
                src={playlist.coverImage}
                alt={playlist.name}
                className="w-full aspect-square object-cover rounded-md"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
                </button>
              </div>
            </div>
            
            <h4 className="text-sm mb-1 truncate">{playlist.name}</h4>
            <p className="text-xs text-muted-foreground">
              {playlist.trackCount} tracks
            </p>
            
            {playlist.similarity && (
              <p className="text-xs text-primary mt-1">
                {t('similarTo')} {playlist.similarity}% {t('similar')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
