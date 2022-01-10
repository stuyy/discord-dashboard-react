import axios, { AxiosRequestConfig } from 'axios';
import { GuildBanLogsType, GuildConfigType, PartialGuild, User } from './types';

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

export const getGuildChannels = (guildId: string) =>
  axios.get(`${API_URL}/discord/guilds/${guildId}/channels`, CONFIG);

export const updateWelcomeChannelId = (guildId: string, channelId: string) =>
  axios.post(
    `${API_URL}/guilds/${guildId}/config/welcome`,
    {
      channelId,
    },
    CONFIG
  );

export const getGuildBanLogs = (guildId: string, fromDate: string) =>
  axios.get<GuildBanLogsType[]>(
    `${API_URL}/guilds/${guildId}/bans?fromDate=${fromDate}`,
    CONFIG
  );
