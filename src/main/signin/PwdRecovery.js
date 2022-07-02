import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Box, Grid, Link, Checkbox, FormControlLabel,
         TextField, CssBaseline, Button, Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Fetching from '../Fetching';
import AppContext from '../../AppContext';
import logo from './comgecey-02lr2.png';
import { apiUrl } from '../apiUrl';
import { useCookies } from 'react-cookie';

const API_SECRET = process.env.REACT_APP_JWT_SECRET;

const baseUrl = apiUrl + 'pwdrecovery';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Comgecey
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function PwdRecovery(props) {
  const classes = useStyles();

  const appContext = useContext(AppContext);
  const { auth, goDashboard, routes, setUserSession } = appContext;

  const [fetched, setFetched] = useState(true);
  const [inputs, setInputs] = useState({email: ''});

  function handleChange(e) {
    e.preventDefault();

    setInputs({...inputs, [e.target.name]: e.target.value});
  }

  function handleClick(e) {
    e.preventDefault();
    setFetched(false);

    axios.post(baseUrl, {email: inputs.email}).then(response => {
      if (response.status === 201) {
        alert('Te hemos enviado un correo electrónico con tu contraseña.');
        setFetched(true);
      } else {
        alert('Correo electrónico incorrecto.');
        setFetched(true);
      }
    }).catch(err => {
      alert('El correo proporcionado no está registrado en nuestra plataforma.');
      setFetched(true);
    });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img position="contain" width="100%" className={classes.image} src={logo} />
        <Fetching fetched={fetched} />
        {
          fetched ? <React.Fragment>
                      <br />
                      <Typography component="h1" variant="h5">
                        Recuperación de Contraseña
                      </Typography></React.Fragment>
                  : ''
        }

        <form className={classes.form} noValidate onChange={handleChange}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            disabled={inputs.email.length <= 4 || !inputs.email.includes('@')}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Enviar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
