export type User = {
  id: string;
  discordId: string;
};

export type PartialGuild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
};

export type GuildConfigType = {
  id: number;
  guildId: string;
  prefix: string;
  welcomeChannelId: string;
};
