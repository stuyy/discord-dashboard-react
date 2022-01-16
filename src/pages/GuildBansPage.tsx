import { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { MoonLoader } from 'react-spinners';
import { GuildContext } from '../utils/contexts/GuildContext';
import { useFetchGuildBans } from '../utils/hooks/useFetchGuildBans';
import {
  Container,
  ContextMenuContainer,
  Flex,
  Page,
  UserBanCard,
} from '../utils/styles';
import { DiscordUserType, GuildBanType } from '../utils/types';
import DefaultAvatar from '../assets/default_avatar.png';
import { deleteGuildBan } from '../utils/api';

export const GuildBansPage = () => {
  const { guild } = useContext(GuildContext);
  const guildId = (guild && guild.id) || '';
  const { bans, loading, updating, setUpdating } = useFetchGuildBans(guildId);
  const [showMenu, setShowMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [selectedBan, setSelectedBan] = useState<GuildBanType>();

  const getAvatarUrl = (user: DiscordUserType) =>
    `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    console.log('Websocket useEffect');
    const socket = io('http://localhost:3001');
    socket.on('guildBanAdd', (data) => {
      console.log(data);
      setUpdating(!updating);
    });
    socket.on('guildBanRemove', (data) => {
      console.log(data);
      setUpdating(!updating);
    });
    return () => {
      console.log('Close Websocket Connection');
      socket.close();
    };
  }, [updating]);

  const handleUnban = async () => {
    if (!selectedBan) {
      console.log('No user was selected.');
      return;
    }
    try {
      console.log(`Unbanning User: ${selectedBan?.user.username}`);
      await deleteGuildBan(guildId, selectedBan.user.id);
      setUpdating(!updating);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page>
      <Container>
        {!loading ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto auto auto',
              gap: '18px',
            }}
          >
            {bans.length ? (
              bans.map((ban) => (
                <UserBanCard
                  onContextMenu={(e) => {
                    console.log('Context Menu Opened');
                    e.preventDefault();
                    setShowMenu(true);
                    setPoints({ x: e.pageX, y: e.pageY });
                    setSelectedBan(ban);
                  }}
                >
                  <div>
                    {ban.user.username}#{ban.user.discriminator}
                  </div>
                  <img
                    src={
                      ban.user.avatar ? getAvatarUrl(ban.user) : DefaultAvatar
                    }
                    alt="avatar"
                    width={100}
                    height={100}
                    style={{ borderRadius: '4px' }}
                  />
                </UserBanCard>
              ))
            ) : (
              <div>No Bans</div>
            )}
            {showMenu && (
              <ContextMenuContainer top={points.y} left={points.x}>
                <ul>
                  <li onClick={handleUnban}>Unban</li>
                  <li>Update Ban</li>
                </ul>
              </ContextMenuContainer>
            )}
          </div>
        ) : (
          <Flex justifyContent="center" alignItems="center">
            <MoonLoader size={40} color="white" />
          </Flex>
        )}
      </Container>
    </Page>
  );
};
