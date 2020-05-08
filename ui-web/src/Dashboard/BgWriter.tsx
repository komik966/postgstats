import React, { FC, memo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { BgWriter as BgWriterModel } from './types';

const BgWriter: FC<Props> = ({ data }) => {
  return (
    <Card>
      <CardHeader title="Background writer" />
      <CardContent>
        <List dense>
          <ListItem>
            <ListItemText
              primary={`${data.checkpointsReqPct}%`}
              secondary="Checkpoint na żądanie"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={data.avgCheckpointWrite}
              secondary="Chceckpoint - średni zapis"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={data.totalWritten}
              secondary="Całkowity zapis (checkpoint, backend, clean)"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`${data.checkpointWritePct}%`}
              secondary="Zapisy checkpoint"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`${data.backendWritePct}%`}
              secondary="Zapisy backend"
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

interface Props {
  data: BgWriterModel;
}

export default memo(
  BgWriter,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data),
);
