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
import { Index } from '../types';
import useExpandStyles from '../useExpandStyles';
import clsx from 'clsx';
import { AccountTree } from '@material-ui/icons';
import ScatterPlot from './ScatterPlot';

const Indexes: FC<Props> = ({ data, expanded, toggle }) => {
  const expandClasses = useExpandStyles();
  return (
    <Card>
      <CardHeader
        title="Wykorzystanie indeksów"
        onClick={toggle}
        className={expandClasses.header}
      />
      <CardContent
        className={clsx({
          [expandClasses.contentNotExpanded]: !expanded,
        })}
      >
        <ScatterPlot
          xLabel="skanowania"
          yLabel="wszystkich zwróconych wierszy"
          data={data.map((index) => ({
            name: index.indexRelName,
            x: index.idxScan,
            y: index.idxTupRead,
          }))}
          height={300}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>nazwa</TableCell>
              <TableCell>śr. zwróconych wierszy</TableCell>
              <TableCell>skanowania</TableCell>
              <TableCell>wszystkich zwróconych wierszy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography align="center">
                    <AccountTree fontSize="large" />
                    <br />
                    Brak indeksów
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {data.length > 0 &&
              data.map((index, idx) => (
                <TableRow key={idx}>
                  <TableCell>{index.indexRelName}</TableCell>
                  <TableCell>{index.avgTuples}</TableCell>
                  <TableCell>{index.idxScan}</TableCell>
                  <TableCell>{index.idxTupRead}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

interface Props {
  data: Index[];
  expanded: boolean;
  toggle: () => void;
}

export default memo(
  Indexes,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    prevProps.expanded === nextProps.expanded,
);
