import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography, Divider, Button} from '@material-ui/core';
import GeneralInfo from './details/GeneralInfo';
import AddressInfo from './details/AddressInfo';
import { apiUrl } from '../apiUrl';

const convUrl = apiUrl + 'convocatories/';
const placeUrl = apiUrl + 'places/';
const convPlaceUrl = apiUrl + 'conv_has_place/';

/*
const initConvInfo = {
  date: '',
  title: '',
  description: '',
  email: '',
  phone: '',
  bank: '',
  bank_account: '',
  status: '',
}

const initPlaceInfo = {
  name: '',
  street: '',
  town: '',
  city: '',
  number: '',
  phone: ''
}
*/

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

export default function NewConvDialog(props) {
  const classes = useStyles();

  const [conv, setConv] = useState({});
  const [place, setPlace] = useState({});

  function handleConvInfoChange(key, value) {
    console.log(key);
    console.log(value);
    setConv({...conv, [key]: value});
  }

  function handlePlaceInfoChange(key, value) {
    console.log(key);
    console.log(value);
    setPlace({...place, [key]: value});
  }

  function handleClick() {
    const convPlace = {}
    axios.post(convUrl, conv).then(response => {
      if (response.status === 201) {
        convPlace.Convocatories_id = response.data.convocatory.id;

        axios.post(placeUrl, place).then(response => {
          if (response.status === 201) {
            convPlace.Places_id = response.data.place.id;

            axios.post(convPlaceUrl, convPlace).then(response => {
              if (response.status === 201) {
                props.closeDialog();
                alert('Convocatoria creada exitosamente.');
              }
            });
          }
        });
      }
    })
  }

  return (
    <Dialog onClose={props.closeDialog} open={props.open}>
      <DialogTitle align="center">
        <Typography align="center" variant="h4" component="h3" gutterBottom style={{alignItems:'center'}}>Nueva Convocatoria</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container styles={{width:'100%'}}>
          <Grid item>
            <Typography component="h1" variant="h5">
              Ficha de Convocatoria
            </Typography>
            <GeneralInfo info={conv} updateInfo={handleConvInfoChange} variant="standard" edit={true} classes={classes}/>
            <br />
            <Divider />
          </Grid>
          <Grid item>
            <Typography component="h1" variant="h5">
              Lugar del Examen
            </Typography>
            <AddressInfo info={place} updateInfo={handlePlaceInfoChange} edit={true} classes={classes}/>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions align="justify-between" className="justify-between pl-16">
      <Button
        variant="contained"
        onClick={props.closeDialog}
      >
        Cancelar
      </Button>
        <Button
          variant="contained"
          onClick={handleClick}
        >
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}
