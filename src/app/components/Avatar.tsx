import { CircleUser } from 'lucide-react';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
  showOnline?: boolean;
  isOnline?: boolean;
}

export function Avatar({ src, alt, className = '', showOnline = false, isOnline = false }: AvatarProps) {
  const isIcon = src.startsWith('icon:');
  
  return (
    <div className="relative inline-block">
      {isIcon ? (
        <div className={`bg-secondary border border-border rounded-full flex items-center justify-center ${className}`}>
          <CircleUser className="w-[60%] h-[60%] text-muted-foreground" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`object-cover rounded-full ${className}`}
        />
      )}
      
      {showOnline && isOnline && (
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary rounded-full border-2 border-card" />
      )}
    </div>
  );
}
