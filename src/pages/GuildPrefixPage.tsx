import { useContext } from 'react';
import { MoonLoader } from 'react-spinners';
import { updateGuildPrefix } from '../utils/api';
import { GuildContext } from '../utils/contexts/GuildContext';
import { useGuildConfig } from '../utils/hooks/useFetchGuildConfig';
import {
  Button,
  Container,
  Flex,
  InputField,
  Page,
  Title,
} from '../utils/styles';

export const GuildPrefixPage = () => {
  const { guild } = useContext(GuildContext);
  const guildId = (guild && guild.id) || '';
  const { config, loading, error, prefix, setPrefix } = useGuildConfig(guildId);

  const savePrefix = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(prefix);
    try {
      const res = await updateGuildPrefix(guildId, prefix);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page>
      <Container style={{ width: '800px' }}>
        {!loading && config ? (
          <>
            <Title>Update Command Prefix</Title>
            <form>
              <div>
                <label htmlFor="prefix">Current Prefix</label>
              </div>
              <InputField
                style={{ margin: '10px 0px' }}
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              />
              <Flex justifyContent="flex-end">
                <Button
                  variant="secondary"
                  type="button"
                  style={{
                    marginRight: '8px',
                  }}
                >
                  Reset
                </Button>
                <Button variant="primary" onClick={savePrefix}>
                  Save
                </Button>
              </Flex>
            </form>
          </>
        ) : (
          <Flex justifyContent="center" alignItems="center">
            <MoonLoader size={30} color="white" />
          </Flex>
        )}
      </Container>
    </Page>
  );
};
