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

export type PartialGuildChannel = {
  id: string;
  last_message_id: string;
  type: number;
  name: string;
  position: number;
  parent_id?: string;
  topic?: string;
  guild_id: string;
  permission_overwrites: string[];
  nsfw: boolean;
  rate_limit_per_user: string;
  banner?: string;
};
