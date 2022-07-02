import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {Paper, Grid, TextField, Button, Typography, InputLabel, FormHelperText,
        FormControl, Select,NativeSelect, InputAdornment} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Fetching from './Fetching';
import { apiUrl } from '../../apiUrl';

const baseUrl = apiUrl + 'users/';

const addressInfo = {
  street: '',
  number: '',
  town: '',
  city: '',
  state: '',
  zip_code: '',
  phone: ''
}

export default function MailAddressInfo(props) {
  const [fetched, setFetched] = useState(false);
  const [editDisabled, setEditDisabled] = useState(false);
  const [info, setInfo] = useState(addressInfo);
  const [labelWidth, setLabelWidth] = useState(0);
  const inputLabel = useRef(null);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(() => {
    const url = baseUrl + props.userId + '/mail';
    axios.get(url).then(response => {
      setInfo(response.data.mail);
      setFetched(true);
    });
  }, []);

  function handleEdit() {
    setEditDisabled(true);
  }

  function handleSave() {
    const url = baseUrl + props.userId + '/mail';
    axios.put(url, info);

    setEditDisabled(false);
  }

  function handleChange(e) {
    e.preventDefault();

    const key = e.target.name;
    const value = e.target.value;
    setInfo(info => ({...info, [key]:value}))
  }

  return (
    <React.Fragment>
      <Grid container justify="space-between">
        <Grid item>
          <Typography component="h1" variant="h5">
            Domicilio de correspondencia
          </Typography>
        </Grid>
        <Grid item>
          <Fetching fetched={fetched} />
        </Grid>
        <Grid item>
          <Button disabled={!editDisabled} onClick={handleSave}><SaveIcon /></Button>
          <Button disabled={editDisabled} onClick={handleEdit}><EditIcon /></Button>
        </Grid>
      </Grid>
      <form className={props.classes.form} noValidate onChange={handleChange} onSubmit={handleSave}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              name="street"
              required
              fullWidth
              id="street"
              label="Calle"
              autoFocus
              size="small"
              value={info.street}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={4} >
            <TextField
              required
              fullWidth
              id="number"
              label="Número"
              name="number"
              size="small"
              value={info.number}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              id="town"
              label="Colonia"
              name="town"
              size="small"
              value={info.town}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              name="city"
              label="Ciudad"
              id="city"
              size="small"
              value={info.city}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl size="small" fullWidth className={props.classes.formControl}>
              <InputLabel ref={inputLabel} htmlFor="standard-age-native-simple">
                Estado
              </InputLabel>
              <Select
                native
                value={info.state} //value={state.age}
                //onChange={handleChange('age')}
                labelWidth={labelWidth}
                inputProps={{
                  name: 'state',
                  id: 'standard-age-native-simple',
                  readOnly: !editDisabled
                }}
                variant={editDisabled ? "standard" : "filled"}
              >
                <option value="no">Seleccione uno...</option>
                <option value="Aguascalientes">Aguascalientes</option>
                <option value="Baja California">Baja California</option>
                <option value="Baja California Sur">Baja California Sur</option>
                <option value="Campeche">Campeche</option>
                <option value="Chiapas">Chiapas</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Coahuila">Coahuila</option>
                <option value="Colima">Colima</option>
                <option value="Distrito Federal">Distrito Federal</option>
                <option value="Durango">Durango</option>
                <option value="Estado de México">Estado de México</option>
                <option value="Guanajuato">Guanajuato</option>
                <option value="Guerrero">Guerrero</option>
                <option value="Hidalgo">Hidalgo</option>
                <option value="Jalisco">Jalisco</option>
                <option value="Michoacán">Michoacán</option>
                <option value="Morelos">Morelos</option>
                <option value="Nayarit">Nayarit</option>
                <option value="Nuevo León">Nuevo León</option>
                <option value="Oaxaca">Oaxaca</option>
                <option value="Puebla">Puebla</option>
                <option value="Querétaro">Querétaro</option>
                <option value="Quintana Roo">Quintana Roo</option>
                <option value="San Luis Potosí">San Luis Potosí</option>
                <option value="Sinaloa">Sinaloa</option>
                <option value="Sonora">Sonora</option>
                <option value="Tabasco">Tabasco</option>
                <option value="Tamaulipas">Tamaulipas</option>
                <option value="Tlaxcala">Tlaxcala</option>
                <option value="Veracruz">Veracruz</option>
                <option value="Yucatán">Yucatán</option>
                <option value="Zacatecas">Zacatecas</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              name="zip_code"
              label="C.P."
              id="zip_code"
              size="small"
              value={info.zip_code}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="phone"
              label="Número telefónico"
              id="phone"
              size="small"
              value={info.phone}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>

        </Grid>
      </form>
    </React.Fragment>
  );
}
