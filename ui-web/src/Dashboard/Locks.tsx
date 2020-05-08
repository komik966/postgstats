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

const Locks: FC<Props> = ({ data }) => {
  return (
    <Card>
      <CardHeader title="Blokady" />
      <CardContent>
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
              data.map((longQuery, idx) => (
                <TableRow key={idx}>
                  <TableCell>{longQuery.lockType}</TableCell>
                  <TableCell>{longQuery.virtualTransaction}</TableCell>
                  <TableCell>{longQuery.transactionTd}</TableCell>
                  <TableCell>{longQuery.nspName}</TableCell>
                  <TableCell>{longQuery.relName}</TableCell>
                  <TableCell>{longQuery.mode}</TableCell>
                  <TableCell>{longQuery.granted ? 'tak' : 'nie'}</TableCell>
                  <TableCell>{longQuery.queryStart}</TableCell>
                  <TableCell>
                    <code>{longQuery.query}</code>
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
}

export default memo(
  Locks,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data),
);
