import { AppBarStyle } from '../utils/styles';
import NestJSIcon from '../assets/nestjs.png';

export const AppBar = () => {
  return (
    <AppBarStyle>
      <h1 style={{ fontWeight: 'normal', fontSize: '20px' }}>Configuring</h1>
      <img
        src={NestJSIcon}
        height={55}
        width={55}
        style={{
          borderRadius: '50%',
        }}
        alt="logo"
      />
    </AppBarStyle>
  );
};
