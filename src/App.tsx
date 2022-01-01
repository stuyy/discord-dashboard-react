import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppBar } from './components/AppBar';
import { CategoryPage } from './pages/CategoryPage';
import { GuildPrefixPage } from './pages/GuildPrefixPage';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { WelcomeMessagePage } from './pages/WelcomeMessagePage';
import { GuildContext } from './utils/contexts/GuildContext';

function App() {
  const [guildId, setGuildId] = useState('');
  const updateGuildId = (id: string) => setGuildId(id);
  return (
    <GuildContext.Provider value={{ guildId, updateGuildId }}>
      <Routes>
        <Route path="/dashboard/*" element={<AppBar />} />
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        {/* <Route path="/dashboard" element={<HomePage />} /> */}
        <Route path="/dashboard/categories" element={<CategoryPage />} />
        <Route path="/dashboard/prefix" element={<GuildPrefixPage />} />
        <Route path="/dashboard/message" element={<WelcomeMessagePage />} />
      </Routes>
    </GuildContext.Provider>
  );
}

export default App;
