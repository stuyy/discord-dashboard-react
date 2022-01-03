import axios, { AxiosRequestConfig } from 'axios';
import { GuildConfigType, PartialGuild, User } from './types';

const CONFIG: AxiosRequestConfig = { withCredentials: true };
const API_URL = 'http://localhost:3001/api';

export const getAuthStatus = () =>
  axios.get<User>(`${API_URL}/auth/status`, CONFIG);

export const getMutualGuilds = () =>
  axios.get<PartialGuild[]>(`${API_URL}/discord/guilds`, CONFIG);

export const getGuildConfig = (guildId: string) =>
  axios.get<GuildConfigType>(`${API_URL}/guilds/config/${guildId}`, CONFIG);

export const updateGuildPrefix = (guildId: string, prefix: string) =>
  axios.post(
    `${API_URL}/guilds/${guildId}/config/prefix`,
    {
      prefix,
    },
    CONFIG
  );
