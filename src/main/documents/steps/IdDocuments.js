import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function IdDocuments(props) {
  const classes = useStyles();

  const [disableSend, setDisableSend] = useState(true)
  const [send, setSend] = useState('Enviar')

  const EMPTY = 'Documento Pendiente';

  const [curp, setCurp] = useState(EMPTY)
  const [rfc, setRfc] = useState(EMPTY)
  const [address, setAddress] = useState(EMPTY)

  useEffect(() => {
    if (curp !== EMPTY & rfc !== EMPTY & address !== EMPTY) {
      setDisableSend(false)
    } else {
      setDisableSend(true)
    }

    if (send == 'Enviado') {
      setDisableSend(true);
    }
  });

  function handleInput(e) {
    let filename = '';
    if (e.target.files.length !== 0) {
      switch (e.target.name) {
        case 'curp':
          filename = e.target.files[0].name
          setCurp(filename);
          break;
        case 'rfc':
          filename = e.target.files[0].name
          setRfc(filename)
          break;
        case 'address':
          filename = e.target.files[0].name
          setAddress(filename)
          break;
        default:
          return;
      }
    } else {
        switch (e.target.name) {
          case 'curp':
            setCurp(EMPTY)
            break;
          case 'rfc':
            setRfc(EMPTY)
            break;
          case 'address':
            setAddress(EMPTY)
            break;
          default:
        }
        setDisableSend(true);
        setSend('Enviar');
        props.next(false);
      }
  }

  function sendHandler(e) {
    e.preventDefault()
    setSend('Enviado');
    props.next(true);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Documentación General
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                component="label"
                >
                CURP
                <input
                  name="curp"
                  accept="application/pdf"
                  onInput={handleInput}
                  type="file"
                  style={{ display: "none" }}
                />
              </Button>
              <Typography component="p" variant="p">
                {curp}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                component="label"
                >
                RFC
                <input
                  name='rfc'
                  accept="application/pdf"
                  onInput={handleInput}
                  type="file"
                  style={{ display: "none" }}
                />
              </Button>
              <Typography component="p" variant="p">
                {rfc}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                component="label"
                >
                Comprobante de Domicilio
                <input
                  name='address'
                  accept="application/pdf"
                  onInput={handleInput}
                  type="file"
                  style={{ display: "none" }}
                />
              </Button>
              <Typography component="p" variant="p">
                {address}
              </Typography>
            </Grid>
          </Grid>

          <Button
            disabled={disableSend}
            onClick={sendHandler}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {send}
          </Button>
        </form>
      </div>
    </Container>
  );
}
