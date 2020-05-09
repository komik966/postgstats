import React, { FC, memo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Lock } from './types';
import { LockOpen } from '@material-ui/icons';
import useExpandStyles from './useExpandStyles';
import clsx from 'clsx';

const Locks: FC<Props> = ({ data, expanded, toggle }) => {
  const expandClasses = useExpandStyles();
  return (
    <Card>
      <CardHeader
        title="Blokady"
        onClick={toggle}
        className={expandClasses.header}
      />
      <CardContent
        className={clsx({
          [expandClasses.contentNotExpanded]: !expanded,
        })}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>typ</TableCell>
              <TableCell>tr. wirtualna</TableCell>
              <TableCell>id tr.</TableCell>
              <TableCell>namespace</TableCell>
              <TableCell>nazwa relacji</TableCell>
              <TableCell>tryb</TableCell>
              <TableCell>przyznano</TableCell>
              <TableCell>start</TableCell>
              <TableCell>zapytanie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={9}>
                  <Typography align="center">
                    <LockOpen fontSize="large" />
                    <br />
                    Brak blokad
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {data.length > 0 &&
              data.map((lock, idx) => (
                <TableRow key={idx}>
                  <TableCell>{lock.lockType}</TableCell>
                  <TableCell>{lock.virtualTransaction}</TableCell>
                  <TableCell>{lock.transactionTd}</TableCell>
                  <TableCell>{lock.nspName}</TableCell>
                  <TableCell>{lock.relName}</TableCell>
                  <TableCell>{lock.mode}</TableCell>
                  <TableCell>{lock.granted ? 'tak' : 'nie'}</TableCell>
                  <TableCell>{lock.queryStart}</TableCell>
                  <TableCell>
                    <code>{lock.query}</code>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

interface Props {
  data: Lock[];
  expanded: boolean;
  toggle: () => void;
}

export default memo(
  Locks,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    prevProps.expanded === nextProps.expanded,
);
