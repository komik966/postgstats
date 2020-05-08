import React, { FC, useEffect, useState } from 'react';
import { webSocket } from 'rxjs/webSocket';
import { StatsResult } from './types';
import DbSize from './DbSize';
import {
  CircularProgress,
  Fab,
  Grid,
  Typography,
  useTheme,
} from '@material-ui/core';
import LongQueries from './LongQueries';
import BgWriter from './BgWriter';
import Locks from './Locks';
import Separator from './Separator';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const Dashboard: FC<Props> = ({ wsUrl, running }) => {
  const theme = useTheme();
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
  const [expanded, setExpanded] = useState({
    bgWriter: true,
    dbSize: true,
    locks: true,
    longQueries: true,
  });
  const shouldClose = Object.values(expanded).every((v) => v);

  if (!statsResult) {
    return <CircularProgress />;
  }

  return (
    <>
      <Fab
        size="small"
        color="primary"
        style={{
          bottom: theme.spacing(),
          position: 'fixed',
          right: theme.spacing(),
        }}
        onClick={() => {
          if (shouldClose) {
            setExpanded({
              bgWriter: false,
              dbSize: false,
              locks: false,
              longQueries: false,
            });
          } else {
            setExpanded({
              bgWriter: true,
              dbSize: true,
              locks: true,
              longQueries: true,
            });
          }
        }}
      >
        {shouldClose ? <ExpandLess /> : <ExpandMore />}
      </Fab>
      <Grid container spacing={1} style={{ marginBottom: 48 }}>
        <Grid sm={12} md={4} item>
          <DbSize
            data={statsResult.dbSize}
            expanded={expanded.dbSize}
            toggle={() =>
              setExpanded((prev) => ({ ...prev, dbSize: !prev.dbSize }))
            }
          />
          <Separator />
          <BgWriter
            data={statsResult.bgWriter}
            expanded={expanded.bgWriter}
            toggle={() =>
              setExpanded((prev) => ({ ...prev, bgWriter: !prev.bgWriter }))
            }
          />
        </Grid>
        <Grid sm={12} md={8} item>
          <LongQueries
            data={statsResult.longQueries}
            expanded={expanded.longQueries}
            toggle={() =>
              setExpanded((prev) => ({
                ...prev,
                longQueries: !prev.longQueries,
              }))
            }
          />
          <Separator />
          <Locks
            data={statsResult.locks}
            expanded={expanded.locks}
            toggle={() =>
              setExpanded((prev) => ({ ...prev, locks: !prev.locks }))
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

interface Props {
  wsUrl: string;
  running: boolean;
}

export default Dashboard;
