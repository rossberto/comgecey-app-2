import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {Paper, Grid, TextField, Button, Typography, InputLabel, Select, FormControl, Container, CssBaseline} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Fetching from './Fetching';
import { apiUrl } from '../../apiUrl';

const baseUrl = apiUrl + 'users/';

export default function IdInfo(props) {
  const [fetched, setFetched] = useState(false);
  const [editDisabled, setEditDisabled] = useState(false);
  const [info, setInfo] = useState({
    name: '',
    father_lname: '',
    mother_lname: '',
    birth_state: '',
    birth_city: '',
    birthdate: ''
  });
  const [labelWidth, setLabelWidth] = useState(0);
  const inputLabel = useRef(null);

  useEffect(() => {
    const url = baseUrl + props.userId;
    console.log(url);
    axios.get(url).then(response => {
      console.log(response.status);
      if (response.status === 200) {
        response.data.user.birthdate = response.data.user.birthdate.slice(0, 10);
        setInfo(response.data.user);
        setFetched(true);
      }
    }).catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleEdit() {
    setEditDisabled(true);
  }

  function handleSave() {
    const url = baseUrl + info.id;
    axios.put(url, info);
    setEditDisabled(false);
  }

  function handleChange(e) {
    e.preventDefault();

    const key = e.target.name;
    const value = e.target.value;
    setInfo(info => ({...info, [key]:value}));
  }

  return (
    <React.Fragment>
      <Grid container justify="space-between">
        <Grid item>
          <Typography component="h1" variant="h5">
            Ficha de identificación
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
      <form className={props.classes.form} noValidate onChange={handleChange}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="name"
              required
              fullWidth
              id="name"
              label="Nombre(s)"
              autoFocus
              size="small"
              value={info.name}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="father_lname"
              label="Apellido Paterno"
              name="father_lname"
              autoComplete="lname"
              size="small"
              value={info.father_lname}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="mother_lname"
              label="Apellido Materno"
              name="mother_lname"
              autoComplete="mother_lnameac"
              size="small"
              value={info.mother_lname}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              name="birthdate"
              label="Fecha de Nacimiento"
              type="date"
              id="birthdate"
              InputLabelProps={{shrink: true}}
              size="small"
              value={info.birthdate}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel ref={inputLabel} htmlFor="standard-age-native-simple" >
                Estado de Nacimiento
              </InputLabel>
              <Select
                native
                value= {info.birth_state ? info.birth_state : 'no'}
                labelWidth={labelWidth}
                inputProps={{
                  name: 'birth_state',
                  id: 'birth_state',
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
          <Grid item xs={12}>
            <TextField
              value={info.birth_city ? info.birth_city : ''}
              variant="outlined"
              required
              fullWidth
              id="birth_city"
              label="Ciudad de Nacimiento"
              name="birth_city"
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
