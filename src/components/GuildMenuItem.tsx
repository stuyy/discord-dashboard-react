import { GuildMenuItemStyle } from '../utils/styles';

type Props = {
  guild: {
    id: string;
    name: string;
    icon: string;
  };
};
export const GuildMenuItem = ({ guild }: Props) => (
  <GuildMenuItemStyle>
    <img
      src={guild.icon}
      alt={guild.name}
      width={40}
      height={40}
      style={{ borderRadius: '50%' }}
    />
    <p>{guild.name}</p>
  </GuildMenuItemStyle>
);
