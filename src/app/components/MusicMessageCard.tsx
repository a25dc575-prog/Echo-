import { Play, Music2 } from 'lucide-react';

interface MusicMessageCardProps {
  title: string;
  artist: string;
  cover: string;
  type: 'track' | 'playlist' | 'album';
}

export function MusicMessageCard({ title, artist, cover, type }: MusicMessageCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer max-w-sm">
      {/* Cover Image */}
      <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden group">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-6 h-6 text-white fill-white" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Music2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span className="text-xs text-primary font-medium uppercase">
            {type === 'playlist' ? 'Spotify Playlist' : type === 'album' ? 'Album' : 'Track'}
          </span>
        </div>
        <h4 className="font-semibold text-sm truncate mb-0.5">{title}</h4>
        <p className="text-xs text-muted-foreground truncate">{artist}</p>
      </div>
    </div>
  );
}
