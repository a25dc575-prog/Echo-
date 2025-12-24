import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface MusicTagsFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export function MusicTagsFilter({ tags, selectedTags, onTagToggle }: MusicTagsFilterProps) {
  const { language } = useLanguage();

  const tagTranslations: Record<string, { JP: string; EN: string }> = {
    "70's City Pop": { JP: '70年代シティポップ', EN: "70's City Pop" },
    'Jazz': { JP: 'ジャズ', EN: 'Jazz' },
    'Anime OST': { JP: 'アニメOST', EN: 'Anime OST' },
    'J-Rock': { JP: 'J-Rock', EN: 'J-Rock' },
    'Visual Kei': { JP: 'ビジュアル系', EN: 'Visual Kei' },
    'Alternative': { JP: 'オルタナティブ', EN: 'Alternative' },
    'K-Pop': { JP: 'K-Pop', EN: 'K-Pop' },
    'J-Pop': { JP: 'J-Pop', EN: 'J-Pop' },
    'Electronic': { JP: 'エレクトロニック', EN: 'Electronic' },
  };

  const getTagLabel = (tag: string) => {
    return tagTranslations[tag]?.[language] || tag;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              isSelected
                ? 'bg-primary text-primary-foreground scale-105'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            {getTagLabel(tag)}
          </button>
        );
      })}
    </div>
  );
}
