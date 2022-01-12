import { useEffect, useState } from 'react';
import { getGuildBans } from '../api';
import { GuildBanType } from '../types';

export function useFetchGuildBans(guildId: string) {
  const [bans, setBans] = useState<GuildBanType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    getGuildBans(guildId)
      .then(({ data }) => {
        setBans(data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { bans, loading, error };
}
