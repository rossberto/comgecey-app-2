import React, { useState, useRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

export default function AddressInfo(props) {
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChange(e) {
    e.preventDefault();

    props.updateInfo(e.target.name, e.target.value);
  }

  return (
    <React.Fragment>
      <form className={props.classes.form} noValidate onChange={handleChange}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              value={props.info.name}
              name="name"
              required
              fullWidth
              id="name"
              label="Lugar"
              autoFocus
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={props.info.street}
              name="street"
              required
              fullWidth
              id="street"
              label="Calle"
              autoFocus
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={4} >
            <TextField
              value={props.info.number}
              required
              fullWidth
              id="number"
              label="Número"
              name="number"
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={props.info.town}
              required
              fullWidth
              id="town"
              label="Colonia"
              name="town"
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={props.info.city}
              required
              fullWidth
              name="city"
              label="Ciudad"
              id="city"
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl size="small" fullWidth className={props.classes.formControl}>
              <InputLabel ref={inputLabel} htmlFor="standard-age-native-simple">
                Estado
              </InputLabel>
              <Select
                value={props.info.state}
                native
                labelWidth={labelWidth}
                disabled={!props.edit}
                inputProps={{
                  name: 'state',
                  id: 'state',
                  readOnly: !props.edit
                }}
                variant={props.edit ? "standard" : "filled"}
              >
                <option value="no">Seleccionar...</option>
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
              value={props.info.zip_code}
              required
              fullWidth
              name="zip_code"
              label="C.P."
              id="zip_code"
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              value={props.info.phone}
              required
              fullWidth
              name="phone"
              label="Número telefónico"
              id="phone"
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>

        </Grid>
      </form>
    </React.Fragment>
  );
}
