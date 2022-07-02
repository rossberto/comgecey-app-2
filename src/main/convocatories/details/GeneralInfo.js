import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField, Grid, Paper, FormControl, InputLabel, Select } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

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

export default function GeneralInfo(props) {
  const classes = useStyles();

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
      <form className={props.classes.form} noValidate onChange={handleChange} onSubmit={e => e.preventDefault()}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              value={props.info.title}
              autoComplete="tit"
              name="title"
              required
              fullWidth
              id="title"
              label="Title "
              autoFocus
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={props.info.date}
              required
              fullWidth
              name="date"
              label="Fecha de Examen"
              type="date"
              id="date"
              InputLabelProps={{shrink: true}}
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={props.info.description}
              required
              fullWidth
              id="description"
              label="Descripción"
              name="description"
              autoComplete="descr"
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={props.info.email}
              required
              fullWidth
              id="email"
              label="Email de Contacto"
              name="email"
              autoComplete="emai"
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={props.info.phone}
              required
              fullWidth
              id="phone"
              label="Teléfono de Contacto"
              name="phone"
              autoComplete="phon"
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={props.info.bank}
              required
              fullWidth
              id="bank"
              label="Banco"
              name="bank"
              autoComplete="bank"
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={props.info.bank_account}
              required
              fullWidth
              id="bank_account"
              label="Cuenta Bancaria"
              name="bank_account"
              autoComplete="bank"
              size="small"
              InputProps={{
                readOnly: !props.edit,
              }}
              variant={props.edit ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl
              size="small"
              fullWidth
              className={props.classes.formControl}
            >
              <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                Estatus
              </InputLabel>
              <Select
                value={props.info.status}
                native
                labelWidth={labelWidth}
                disabled={!props.edit}
                inputProps={{
                  name: 'status',
                  id: 'status',
                  readOnly: !props.edit
                }}
                variant={props.edit ? "standard" : "filled"}
              >
                <option value="Seleccionar">Seleccionar...</option>
                <option value="Inactiva">Inactiva</option>
                <option value="Abierta">Abierta</option>
                <option value="Cerrada">Cerrada</option>
                <option value="Cancelada">Cancelada</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
