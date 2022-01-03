import { useEffect, useState } from 'react';
import { getMutualGuilds } from '../api';
import { PartialGuild } from '../types';

export function useFetchGuilds() {
  const [guilds, setGuilds] = useState<PartialGuild[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    getMutualGuilds()
      .then(({ data }) => {
        setGuilds(data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { guilds, loading, error };
}
