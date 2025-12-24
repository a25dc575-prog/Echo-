import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { musicGeneData } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export function MusicRadar() {
  const { t } = useLanguage();

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="mb-4">{t('musicGene')}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={musicGeneData}>
          <PolarGrid stroke="#282828" />
          <PolarAngleAxis dataKey="genre" stroke="#B3B3B3" />
          <PolarRadiusAxis stroke="#B3B3B3" />
          <Radar
            name="Music Gene"
            dataKey="value"
            stroke="#1DB954"
            fill="#1DB954"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
