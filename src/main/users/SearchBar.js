import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, InputBase, Divider, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {

    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    marginBottom: "24px"
    //maxWidth: "500px"
    //width: "100%"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();

  function handleChange(e) {
    e.preventDefault();
    props.updateFilter(e.target.value);
  }

  return (
    <React.Fragment>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Buscar Usuario"
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={handleChange}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </React.Fragment>
  );
}
