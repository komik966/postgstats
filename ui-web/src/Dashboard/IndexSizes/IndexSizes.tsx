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
  useTheme,
} from '@material-ui/core';
import { IndexSize } from '../types';
import useExpandStyles from '../useExpandStyles';
import clsx from 'clsx';
import { AccountTree } from '@material-ui/icons';
import HorizontalBarChart from './HorizontalBarChart';

const IndexSizes: FC<Props> = ({ data, expanded, toggle }) => {
  const theme = useTheme();
  const expandClasses = useExpandStyles();
  return (
    <Card>
      <CardHeader
        title="Rozmiar indeksów"
        onClick={toggle}
        className={expandClasses.header}
      />
      <CardContent
        className={clsx({
          [expandClasses.contentNotExpanded]: !expanded,
        })}
      >
        <HorizontalBarChart
          data={data.map((indexSize) => ({
            label: indexSize.idxName,
            value: +indexSize.idxSize,
          }))}
          color={theme.palette.grey['300']}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>nazwa</TableCell>
              <TableCell>rozmiar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography align="center">
                    <AccountTree fontSize="large" />
                    <br />
                    Brak indeksów
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {data.length > 0 &&
              data.map((indexSize) => (
                <TableRow key={indexSize.idxName}>
                  <TableCell>{indexSize.idxName}</TableCell>
                  <TableCell>{indexSize.idxSizePretty}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

interface Props {
  data: IndexSize[];
  expanded: boolean;
  toggle: () => void;
}

export default memo(
  IndexSizes,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    prevProps.expanded === nextProps.expanded,
);
