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
import useExpandStyles from './useExpandStyles';
import clsx from 'clsx';

const BgWriter: FC<Props> = ({ data, expanded, toggle }) => {
  const expandClasses = useExpandStyles();
  return (
    <Card>
      <CardHeader
        title="Background writer"
        onClick={toggle}
        className={expandClasses.header}
      />
      <CardContent
        className={clsx({
          [expandClasses.contentNotExpanded]: !expanded,
        })}
      >
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
  expanded: boolean;
  toggle: () => void;
}

export default memo(
  BgWriter,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    prevProps.expanded === nextProps.expanded,
);
