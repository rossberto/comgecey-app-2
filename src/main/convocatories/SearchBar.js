import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, InputBase, Divider, IconButton, InputLabel, FormHelperText,
        FormControl, Select, NativeSelect} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import NewConvDialog from './NewConvDialog';

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

export default function SearchBar(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [inputs, setInputs] = React.useState({
    searchText: '',
    filterOption: 'Todas'
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChange(e) {
    props.updateFilter(e.target.name, e.target.value);
  };

  function handleClick() {
    setOpen(true);
  }

  function handleDialogClose() {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Paper component="form" className={classes.root}>
        <InputBase
          name="searchText"
          className={classes.input}
          placeholder="Buscar Convocatoria"
          inputProps={{ 'aria-label': 'search google maps' }}
          //value={inputs.searchText}
          onChange={handleChange}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <br />
        <FormControl size="small" variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
            Mostrar
          </InputLabel>
          <Select
            native
            //value={inputs.filterOption}
            labelWidth={labelWidth}
            inputProps={{
              name: 'filterOption',
              id: 'outlined-age-native-simple',
            }}
            onChange={handleChange}
          >
            <option value="Todas">Todas</option>
            <option value="Inactiva">Inactivas</option>
            <option value="Abierta">Abiertas</option>
            <option value="Cerrada">Cerradas</option>
            <option value="Cancelada">Canceladas</option>
          </Select>
        </FormControl>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary" className={classes.iconButton}
                    aria-label="directions" onClick={handleClick}>
          <Add />
        </IconButton>
        <NewConvDialog refreshConvs={props.refreshConvs}  closeDialog={handleDialogClose} open={open} />
      </Paper>
    </React.Fragment>
  );
}
