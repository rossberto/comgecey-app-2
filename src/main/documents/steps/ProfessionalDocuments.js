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

export default function ProfessionalDocuments(props) {
  const classes = useStyles();

  const [disableSend, setDisableSend] = useState(true)
  const [send, setSend] = useState('Enviar')

  const EMPTY = 'Documento Pendiente';

  const [laboral, setLaboral] = useState(EMPTY)
  const [titulo, setTitulo] = useState(EMPTY)
  const [cedula, setCedula] = useState(EMPTY)

  useEffect(() => {
    if (laboral !== EMPTY & titulo !== EMPTY & cedula !== EMPTY) {
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
        case 'laboral':
          filename = e.target.files[0].name
          setLaboral(filename)
          break;
        case 'titulo':
          filename = e.target.files[0].name
          setTitulo(filename)
          break;
        case 'cedula':
          filename = e.target.files[0].name
          setCedula(filename)
          break;
        default:
          return;
      }
    } else {
        switch (e.target.name) {
          case 'laboral':
            setLaboral(EMPTY)
            break;
          case 'titulo':
            setTitulo(EMPTY)
            break;
          case 'cedula':
            setCedula(EMPTY)
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
          Documentación Profesional
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
                Constancia Laboral
                <input
                  name="laboral"
                  accept="application/pdf"
                  onInput={handleInput}
                  type="file"
                  style={{ display: "none" }}
                />
              </Button>
              <Typography component="p" variant="p">
                {laboral}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                component="label"
                >
                Título de Médico
                <input
                  name='titulo'
                  accept="application/pdf"
                  onInput={handleInput}
                  type="file"
                  style={{ display: "none" }}
                />
              </Button>
              <Typography component="p" variant="p">
                {titulo}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                component="label"
                >
                Cédula Profesional
                <input
                  name='cedula'
                  accept="application/pdf"
                  onInput={handleInput}
                  type="file"
                  style={{ display: "none" }}
                />
              </Button>
              <Typography component="p" variant="p">
                {cedula}
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
