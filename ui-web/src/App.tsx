import React, { FC, useState } from 'react';
import Dashboard from './Dashboard';
import AppBar from './AppBar';
import config from './config';
import { makeStyles } from '@material-ui/core/styles';

const App: FC = () => {
  const [state, setState] = useState({
    running: true,
    wsUrl: config.WS_URL,
  });
  const classes = useStyles();

  return (
    <>
      <AppBar
        onPlayClick={(newWsUrl) =>
          setState((prev) => ({ running: !prev.running, wsUrl: newWsUrl }))
        }
        running={state.running}
      />
      <div className={classes.dashboardContainer}>
        <Dashboard wsUrl={state.wsUrl} running={state.running} />
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    margin: theme.spacing(1, 0.5),
  },
}));

export default App;
