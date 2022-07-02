import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, TextField, Button, Typography} from '@material-ui/core';
import IdInfo from './details/IdInfo';
import UserFiles from './UserFiles';
import ProfessionalInfo from './details/ProfessionalInfo';
import AddressInfo from './details/AddressInfo';

import AppContext from '../../AppContext';

const useStyles = makeStyles(theme => ({
  root: {
    //flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  }
}));

export default function Profile(props) {
  const classes = useStyles();

  const appContext = useContext(AppContext);
  const { auth, goDashboard, routes, userSession, setUserSession } = appContext;

  useEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography align="center" variant="h2" component="h2" gutterBottom style={{alignItems:'center'}}>Perfil de Médico</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <IdInfo info={userSession} classes={classes}/>
          </Paper>
          <br />
          <Paper className={classes.paper}>
            <UserFiles userId={props.match.params.userId} classes={classes}/>
          </Paper>
          <br />
          <Paper className={classes.paper}>
            {<AddressInfo userId={props.match.params.userId} classes={classes} />}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <ProfessionalInfo userId={props.match.params.userId} classes={classes} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
