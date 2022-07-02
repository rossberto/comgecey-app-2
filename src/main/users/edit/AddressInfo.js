import React from 'react';
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
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <Grid container justify="space-between">
        <Grid item>
          <Typography component="h1" variant="h5">
            Domicilio particular
          </Typography>
        </Grid>
        <Grid item>
          <Button disabled><SaveIcon /></Button>
          <Button><EditIcon /></Button>
        </Grid>
      </Grid>
      <form className={props.classes.form} noValidate>
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
              value={props.info.street}
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
              value={props.info.number}
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
              value={props.info.town}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              name="ciudad"
              label="Ciudad"
              id="ciudad"
              size="small"
              value={props.info.city}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl size="small" fullWidth className={props.classes.formControl}>
              <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                Estado
              </InputLabel>
              <Select

                native
                value={props.info.state} //value={state.age}
                onChange={handleChange('age')}
                labelWidth={labelWidth}
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
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
              name="zipcode"
              label="C.P."
              id="zipcode"
              size="small"
              value={props.info.cp}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="phone_number"
              label="Número telefónico"
              id="phone_number"
              size="small"
              value={props.info.phone}
            />
          </Grid>

        </Grid>
      </form>
    </React.Fragment>
  );
}
