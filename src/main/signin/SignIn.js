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
const baseUrl = apiUrl + 'auth/';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://comgecey.org/">
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

export default function SignIn() {
  const classes = useStyles();

  const appContext = useContext(AppContext);
  const { auth, goDashboard, routes, setUserSession } = appContext;

  const [fetched, setFetched] = useState(true);
  const [inputs, setInputs] = useState({email: '', password: ''});

  const [cookies, setCookie] = useCookies(['userId']);

  useEffect(() => {
    console.log(cookies);
    if (cookies.userId && cookies.token) {
      axios.defaults.headers = {
          Authorization: cookies.token + ':' + API_SECRET
      }

      console.log(axios.defaults.headers);

      goDashboard(true, cookies.userId);
    }
  }, [cookies.userId]);

  function handleChange(e) {
    e.preventDefault();

    setInputs({...inputs, [e.target.name]: e.target.value});
  }

  function handleClick(e) {
    e.preventDefault();

    setFetched(false);

    axios.post(baseUrl, {email: inputs.email, password: inputs.password}).then(response => {
      if (response.status === 201) {
        setCookie('userId', response.data.user.id, {
          maxAge: 3600
        });

        setCookie('token', response.data.access_token, {
          maxAge: 3600
        });

        setCookie('is_admin', response.data.user.is_admin, {
          maxAge: 3600
        });

        response.data.user.birthdate = response.data.user.birthdate.slice(0,10);

        setUserSession(response.data.user);
        setFetched(true);
      } else {
        alert('Usuario y/o contraseña incorrectos');
        setFetched(true);
      }
    }).catch(err => {
      alert('Usuario no ha confirmado correo o le falta completar su información de registro.');
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
                      <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        Ingreso
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/recover" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="https://comgecey.org/registro" variant="body2">
                {"¿Todavía no tienes cuenta? Regístrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
