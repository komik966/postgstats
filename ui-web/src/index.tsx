import React from 'react';
import ReactDOM from 'react-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

ReactDOM.render(
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">PostgStats</Typography>
    </Toolbar>
  </AppBar>,
  document.getElementById('root'),
);
