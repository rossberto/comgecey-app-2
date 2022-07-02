import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, TextField, Button, Typography} from '@material-ui/core';
import GeneralInfo from './details/GeneralInfo';
import AddressInfo from './details/AddressInfo';
import Suscribers from './details/Suscribers';
import EditDetails from './details/EditDetails';
import { apiUrl } from '../apiUrl';

const convsUrl = apiUrl + 'convocatories/';
const placesUrl = apiUrl + 'places/';
const convPlaceUrl = apiUrl + 'conv_has_place/';

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

const initConv = {
  title: '',
  date: '',
  description: '',
  email: '',
  phone: '',
  bank: '',
  bank_account: '',
  status: ''
}

const initPlace = {
  name: '',
  street: '',
  number: '',
  town: '',
  city: '',
  state: '',
  zip_code: '',
  phone: ''
}

export default function MyConvocatory(props) {
  const classes = useStyles();

  const [fetched, setFetched] = useState(false);
  const [conv, setConv] = useState(initConv);
  const [place, setPlace] = useState(initPlace);
  const [edit, setEdit] = useState({ GenInfo: false, AddressInfo: false });

  useEffect(() => {
    axios.get(convsUrl + props.match.params.convocatoryId).then(response => {
      response.data.convocatory.date = response.data.convocatory.date.slice(0,10);
      setConv(response.data.convocatory);

      axios.get(convPlaceUrl + props.match.params.convocatoryId).then(response => {
        if (response.status === 200) {
          axios.get(placesUrl + response.data.convocatory_has_place.Places_id).then(response => {
            if (response.status === 200) {
              setPlace(response.data.place);
              setFetched(true);
            }
          });
        }
      });
    });
  }, [props.match.params]);

  function handleEditEnable(name) {
    setEdit({...edit, [name]:true});
  }

  function handleConvInfo(key, value) {
    setConv({...conv, [key]: value});
  }

  function handlePlaceInfo(key, value) {
    setPlace({...place, [key]: value});
  }

  function handleSave(name) {
    switch (name) {
      case 'GenInfo':
        axios.put(convsUrl + props.match.params.convocatoryId, conv).then(response => {
          console.log(response);
        });
        break;
      case 'AddressInfo':
        axios.put(placesUrl + place.id, place).then(response => {
          console.log(response);
        });
        break;
      default:

    }
    setEdit({...edit, [name]:false});
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <Typography align="center" variant="h2" component="h2" gutterBottom style={{alignItems:'center'}}>Convocatoria {conv.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <EditDetails
              name='GenInfo'
              title="Ficha de Convocatoria"
              enableEdit={handleEditEnable}
              handleSave={handleSave}
              edit={edit.GenInfo}
              fetched={fetched}
            />
            <GeneralInfo info={conv} updateInfo={handleConvInfo} classes={classes} edit={edit.GenInfo}/>
          </Paper>
          <br />
          <Paper className={classes.paper}>
            <EditDetails
              name="AddressInfo"
              title="Lugar de Examen"
              enableEdit={handleEditEnable}
              handleSave={handleSave}
              edit={edit.AddressInfo}
              fetched={fetched}
            />
            <AddressInfo info={place} updateInfo={handlePlaceInfo} classes={classes} edit={edit.AddressInfo}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
