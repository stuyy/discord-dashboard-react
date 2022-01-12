import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { AppBar } from './components/AppBar';
import { Spinner } from './components/Spinner';
import { CategoryPage } from './pages/CategoryPage';
import { GuildAnalyticsPage } from './pages/GuildAnalyticsPage';
import { GuildBansPage } from './pages/GuildBansPage';
import { GuildPrefixPage } from './pages/GuildPrefixPage';
import { LoginPage } from './pages/LoginPage';
import { MenuPage } from './pages/MenuPage';
import { WelcomeMessagePage } from './pages/WelcomeMessagePage';
import { GuildContext } from './utils/contexts/GuildContext';
import { useFetchUser } from './utils/hooks/useFetchUser';
import { PartialGuild } from './utils/types';

function App() {
  const [guild, setGuild] = useState<PartialGuild>();
  const { user, loading, error } = useFetchUser();

  const updateGuild = (guild: PartialGuild) => setGuild(guild);

  if (loading) return <Spinner children={<BarLoader color="white" />} />;

  return (
    <GuildContext.Provider value={{ guild, updateGuild }}>
      {user && !error ? (
        <>
          <Routes>
            <Route path="/dashboard/*" element={<AppBar />} />
          </Routes>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/menu" element={<MenuPage />} />
            {/* <Route path="/dashboard" element={<HomePage />} /> */}
            <Route path="/dashboard/categories" element={<CategoryPage />} />
            <Route path="/dashboard/prefix" element={<GuildPrefixPage />} />
            <Route path="/dashboard/message" element={<WelcomeMessagePage />} />
            <Route
              path="/dashboard/analytics"
              element={<GuildAnalyticsPage />}
            />
            <Route path="/dashboard/bans" element={<GuildBansPage />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      )}
    </GuildContext.Provider>
  );
}

export default App;
