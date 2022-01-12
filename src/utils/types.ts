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

export type ModerationActionType = 'ban' | 'kick' | 'timeout';

export type GuildModLogType = {
  id: number;
  guildId: string;
  memberId: string;
  issuedBy: string;
  issuedOn: Date;
  reason?: string;
  type: ModerationActionType;
};

export type DiscordUserType = {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
};

export type GuildBanType = {
  reason?: string;
  user: DiscordUserType;
};
