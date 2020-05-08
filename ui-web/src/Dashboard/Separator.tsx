import React, { FC } from 'react';
import { useTheme } from '@material-ui/core';

const Separator: FC = () => {
  const theme = useTheme();

  return <div style={{ marginTop: theme.spacing() }} />;
};

export default Separator;
