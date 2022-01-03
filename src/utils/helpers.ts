import { PartialGuild } from './types';

export const getIconURL = (guild: PartialGuild) =>
  `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
