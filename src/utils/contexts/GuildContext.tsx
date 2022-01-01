import { createContext } from 'react';

type GuildContextType = {
  guildId: string;
  updateGuildId: (id: string) => void;
};

export const GuildContext = createContext<GuildContextType>({
  guildId: '',
  updateGuildId: () => {},
});
