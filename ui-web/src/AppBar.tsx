import React, { FC, useState } from 'react';
import {
  AppBar as MuiAppBar,
  colors,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { PauseCircleOutline, PlayCircleOutline } from '@material-ui/icons';
import config from './config';
import { makeStyles } from '@material-ui/core/styles';

const AppBar: FC<Props> = ({ onPlayClick, running }) => {
  const [inputValue, setInputValue] = useState(config.WS_URL);
  const classes = useStyles();

  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">PostgStats</Typography>

        <TextField
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="PostgStats WebSocket URL"
          variant="outlined"
          margin="dense"
          className={classes.textField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => onPlayClick(inputValue)}>
                  {running ? (
                    <PauseCircleOutline className={classes.pause} />
                  ) : (
                    <PlayCircleOutline className={classes.play} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Toolbar>
    </MuiAppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  pause: {
    color: colors.red['700'],
  },
  play: {
    color: colors.green['500'],
  },
  textField: {
    '& .MuiInputBase-root': {
      background: theme.palette.grey['300'],
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.grey['700'],
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    marginLeft: theme.spacing(),
  },
}));

interface Props {
  onPlayClick: (newWsUrl: string) => void;
  running: boolean;
}

export default AppBar;
