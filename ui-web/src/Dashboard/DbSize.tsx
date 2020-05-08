import React, { FC, memo } from 'react';
import { Card, CardContent, CardHeader, useTheme } from '@material-ui/core';
import { DbSizeStats } from './types';
import VerticalBarChart from '../Chart/VerticalBarChart';
import useExpandStyles from './useExpandStyles';
import clsx from 'clsx';

const DbSize: FC<Props> = ({ data, expanded, toggle }) => {
  const theme = useTheme();
  const expandClasses = useExpandStyles();
  return (
    <Card>
      <CardHeader
        title="Rozmiar bazy"
        onClick={toggle}
        className={expandClasses.header}
      />
      <CardContent
        className={clsx({
          [expandClasses.contentNotExpanded]: !expanded,
        })}
      >
        <VerticalBarChart
          data={data}
          color={theme.palette.grey['300']}
          height={300}
        />
      </CardContent>
    </Card>
  );
};

interface Props {
  data: DbSizeStats;
  expanded: boolean;
  toggle: () => void;
}

export default memo(
  DbSize,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    prevProps.expanded === nextProps.expanded,
);
