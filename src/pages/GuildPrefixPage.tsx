import {
  Button,
  Container,
  Flex,
  InputField,
  Page,
  Title,
} from '../utils/styles';

export const GuildPrefixPage = () => (
  <Page>
    <Container style={{ width: '800px' }}>
      <Title>Update Command Prefix</Title>
      <form>
        <div>
          <label htmlFor="prefix">Current Prefix</label>
        </div>
        <InputField style={{ margin: '10px 0px' }} id="prefix" />
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
          <Button variant="primary">Save</Button>
        </Flex>
      </form>
    </Container>
  </Page>
);
