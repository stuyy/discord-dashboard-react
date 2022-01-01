import { FaDiscord, FaQuestionCircle } from 'react-icons/fa';
import { HomePageStyle, MainButton } from '../utils/styles';

export const HomePage = () => (
  <HomePageStyle>
    <div></div>
    <div>
      <MainButton>
        <FaDiscord size={45} color="5865F2" />
        <p style={{ fontSize: '18px' }}>Login with Discord</p>
      </MainButton>
      <MainButton>
        <FaQuestionCircle size={45} />
        <p style={{ fontSize: '18px' }}>Support Server</p>
      </MainButton>
    </div>
    <div
      style={{
        display: 'flex',
        width: '400px',
        justifyContent: 'space-between',
      }}
    >
      <span>Privacy Policy</span>
      <span>Terms of Service</span>
      <span>Contact Us</span>
    </div>
  </HomePageStyle>
);
