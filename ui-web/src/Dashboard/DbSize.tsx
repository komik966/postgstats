import React, { FC, memo } from 'react';
import { Card, CardContent, CardHeader, useTheme } from '@material-ui/core';
import { DbSizeStats } from './types';
import VerticalBarChart from '../Chart/VerticalBarChart';

const DbSize: FC<Props> = ({ data }) => {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader title="Rozmiar bazy" />
      <CardContent>
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
}

export default memo(
  DbSize,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data),
);
