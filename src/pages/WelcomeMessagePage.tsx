import { useContext } from 'react';
import { MoonLoader } from 'react-spinners';
import { updateWelcomeChannelId } from '../utils/api';
import { GuildContext } from '../utils/contexts/GuildContext';
import { useWelcomePage } from '../utils/hooks/useWelcomePage';
import {
  Button,
  Container,
  Flex,
  Page,
  Select,
  TextArea,
  Title,
} from '../utils/styles';

export const WelcomeMessagePage = () => {
  const { guild } = useContext(GuildContext);
  const guildId = (guild && guild.id) || '';
  const { config, channels, selectedChannel, setSelectedChannel, loading } =
    useWelcomePage(guildId);

  const updateWelcomeChannel = async () => {
    console.log(selectedChannel);
    try {
      await updateWelcomeChannelId(guildId, selectedChannel || '');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page>
      <Container>
        <Title>Update Welcome Message</Title>
        {channels && config && !loading ? (
          <div>
            <section>
              <div>
                <label>Current Channel</label>
              </div>
              <Select
                style={{ margin: '10px 0' }}
                onChange={(e) => setSelectedChannel(e.target.value)}
              >
                <option>Please Select a Channel</option>
                {channels.map((channel) => (
                  <option
                    selected={channel.id === config.welcomeChannelId}
                    value={channel.id}
                  >
                    #{channel.name}
                  </option>
                ))}
              </Select>
            </section>
            <section style={{ margin: '10px 0' }}>
              <div>
                <label htmlFor="message">Current Message</label>
              </div>
              <TextArea style={{ marginTop: '10px' }} id="message" />
            </section>
            <Flex justifyContent="flex-end">
              <Button
                variant="secondary"
                style={{
                  marginRight: '8px',
                }}
              >
                Reset
              </Button>
              <Button variant="primary" onClick={updateWelcomeChannel}>
                Save
              </Button>
            </Flex>
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
