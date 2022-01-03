import { useEffect, useState } from 'react';
import { getGuildConfig } from '../api';
import { GuildConfigType } from '../types';

export function useGuildConfig(guildId: string) {
  const [config, setConfig] = useState<GuildConfigType>();
  const [prefix, setPrefix] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    getGuildConfig(guildId)
      .then(({ data }) => {
        setConfig(data);
        setPrefix(data.prefix);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }, []);

  return { config, prefix, setPrefix, loading, error };
}
