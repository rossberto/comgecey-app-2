import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

export default function IdInfo(props) {
  return (
    <React.Fragment>
      <Grid container justify="space-between">
        <Grid item>
          <Typography component="h1" variant="h5">
            Ficha de identificación
          </Typography>
        </Grid>
        <Grid item>
          <Button disabled><SaveIcon /></Button>
          <Button><EditIcon /></Button>
        </Grid>
      </Grid>
      <form className={props.classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="Nombre(s)"
              autoFocus
              size="small"
              value={props.info.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Apellido Paterno"
              name="lastName"
              autoComplete="lname"
              size="small"
              value={props.info.father_lname}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="email"
              label="Apellido Materno"
              name="email"
              autoComplete="email"
              size="small"
              value={props.info.mother_lname}
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
              value={props.info.birthdate}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="birthplace"
              label="Lugar de Nacimiento"
              name="birthplace"
              size="small"
              value={props.info.birthplace}
            />
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
