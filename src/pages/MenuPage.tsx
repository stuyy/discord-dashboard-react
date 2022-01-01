import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuildMenuItem } from '../components/GuildMenuItem';
import { GuildContext } from '../utils/contexts/GuildContext';
import { Container, Page } from '../utils/styles';
import { mockGuilds } from '../__mocks__/guilds';
export const MenuPage = () => {
  const navigate = useNavigate();
  const { updateGuildId } = useContext(GuildContext);

  const handleClick = (guildId: string) => {
    updateGuildId(guildId);
    navigate('/dashboard/categories');
  };

  return (
    <Page>
      <Container>
        <h2 style={{ fontWeight: 300 }}>Select a Server</h2>
        <div>
          {mockGuilds.map((guild) => (
            <div onClick={() => handleClick(guild.id)}>
              <GuildMenuItem guild={guild} />
            </div>
          ))}
        </div>
      </Container>
    </Page>
  );
};
