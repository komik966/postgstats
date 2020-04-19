import React, { FC, useState } from 'react';
import Dashboard from './Dashboard';
import AppBar from './AppBar';
import config from './config';

const App: FC = () => {
  const [state, setState] = useState({
    running: true,
    wsUrl: config.WS_URL,
  });

  return (
    <>
      <AppBar
        onPlayClick={newWsUrl =>
          setState(prev => ({ running: !prev.running, wsUrl: newWsUrl }))
        }
        running={state.running}
      />
      <Dashboard wsUrl={state.wsUrl} running={state.running} />
    </>
  );
};

export default App;
