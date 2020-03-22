import React, { FC, useState } from 'react';
import Dashboard from './Dashboard';
import AppBar from './AppBar';
import config from './config';

const App: FC = () => {
  const [wsUrl, setWsUrl] = useState(config.WS_URL);

  return (
    <>
      <AppBar onPlayClick={setWsUrl} />
      <Dashboard wsUrl={wsUrl} />
    </>
  );
};

export default App;
