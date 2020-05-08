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
import { LongQuery } from './types';
import { Speed } from '@material-ui/icons';
import useExpandStyles from './useExpandStyles';
import clsx from 'clsx';

const LongQueries: FC<Props> = ({ data, expanded, toggle }) => {
  const expandClasses = useExpandStyles();
  return (
    <Card>
      <CardHeader
        title="Długie zapytania"
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
              <TableCell>czas wyk.</TableCell>
              <TableCell>nazwa bazy</TableCell>
              <TableCell>nazwa użytkownika</TableCell>
              <TableCell>stan</TableCell>
              <TableCell>zapytanie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography align="center">
                    <Speed fontSize="large" />
                    <br />
                    Brak długich zapytań
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {data.length > 0 &&
              data.map((longQuery, idx) => (
                <TableRow key={idx}>
                  <TableCell>{longQuery.runtime}</TableCell>
                  <TableCell>{longQuery.dbName}</TableCell>
                  <TableCell>{longQuery.username}</TableCell>
                  <TableCell>{longQuery.state}</TableCell>
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
  data: LongQuery[];
  expanded: boolean;
  toggle: () => void;
}

export default memo(
  LongQueries,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    prevProps.expanded === nextProps.expanded,
);
