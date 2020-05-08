import React, { FC, useEffect, useState } from 'react';
import { webSocket } from 'rxjs/webSocket';
import { StatsResult } from './types';
import DbSize from './DbSize';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import LongQueries from './LongQueries';
import BgWriter from './BgWriter';

const Dashboard: FC<Props> = ({ wsUrl, running }) => {
  const [statsResult, setStatsResult] = useState<StatsResult>();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!running) {
      return;
    }
    setError(false);
    const subject = webSocket<StatsResult>(wsUrl);
    subject.subscribe({ error: () => setError(true), next: setStatsResult });

    return () => subject.unsubscribe();
  }, [wsUrl, running]);

  if (error) {
    return (
      <Typography>
        Błąd połączenia. Spróbuj zatrzymać i uruchomić ponownie używając
        przycisku w pasku z adresem WebSocket'u.
      </Typography>
    );
  }

  if (!statsResult) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={1}>
      <Grid sm={12} md={4} item>
        <DbSize data={statsResult.dbSize} />
      </Grid>
      <Grid sm={12} md={8} item>
        <LongQueries data={statsResult.longQueries} />
      </Grid>
      <Grid sm={12} md={4} item>
        <BgWriter data={statsResult.bgWriter} />
      </Grid>
    </Grid>
  );
};

interface Props {
  wsUrl: string;
  running: boolean;
}

export default Dashboard;
