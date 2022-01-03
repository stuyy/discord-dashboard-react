import { AppBarStyle } from '../utils/styles';
import NestJSIcon from '../assets/nestjs.png';
import { useContext } from 'react';
import { GuildContext } from '../utils/contexts/GuildContext';
import { Navigate } from 'react-router-dom';
import { getIconURL } from '../utils/helpers';

export const AppBar = () => {
  const { guild } = useContext(GuildContext);
  console.log(guild);

  return guild ? (
    <AppBarStyle>
      <h1 style={{ fontWeight: 'normal', fontSize: '20px' }}>
        Configuring {guild.name}
      </h1>
      <img
        src={getIconURL(guild)}
        height={55}
        width={55}
        style={{
          borderRadius: '50%',
        }}
        alt="logo"
      />
    </AppBarStyle>
  ) : (
    <Navigate replace to="/menu" />
  );
};
