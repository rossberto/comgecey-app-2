import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import FileAddIcon from '@material-ui/icons/NoteAdd';
import SaveIcon from '@material-ui/icons/Save';
import Fetching from './details/Fetching';
import { apiUrl } from '../apiUrl';

const baseUrl = apiUrl + 'users/';

const useStyles = makeStyles({
  table: {
    //minWidth: 350,
    width: "100%"
  },
});

const endpoints = {
  'Solicitud firmada': 'firma',
  'CURP': 'curp',
  'RFC': 'rfc',
  'Comprobante de domicilio': 'domicilio',
  'Título Profesional': 'profesional',
  'Cédula Profesional': 'cedula',
  'Comprobante de ejercicio profesional': 'ejercicio',
  'Comprobante de pago': 'pago'
}

const initFile = {
  'Solicitud firmada': {
    endpoint: 'firma',
  },
  'CURP': {
    endpoint: 'curp',
  },
  'RFC': {
    endpoint: 'rfc',
  },
  'Comprobante de domicilio': {
    endpoint: 'domicilio',
  },
  'Título Profesional': {
    endpoint: 'profesional'
  },
  'Cédula Profesional': {
    endpoint: 'cedula'
  },
  'Comprobante de ejercicio profesional': {
    endpoint: 'ejercicio',
  },
  'Comprobante de pago': {
    endpoint: 'pago'
  }
}

const initSaveDisabled = {
  'Solicitud firmada': true,
  'CURP': true,
  'RFC': true,
  'Comprobante de domicilio': true,
  'Título Profesional': true,
  'Cédula Profesional': true,
  'Comprobante de ejercicio profesional': true,
  'Comprobante de pago': true
}

function UserFiles(props) {
  const classes = useStyles();

  const [fetched, setFetched] = useState(false);
  const [file, setFile] = useState(initFile);
  const [saveDisabled, setSaveDisabled] = useState(initSaveDisabled);
  const [filePath, setFilePath] = useState({});

  useEffect(() => {
    async function checkFiles(base, end) {
      const responses = await Promise.all(
        Object.keys(endpoints).map(key => {
          const url = base + `${endpoints[key]}/${endpoints[key]}-` + end;
          return axios.head(url).catch(err => {return err});
        })
      );

      return responses;
    }

    const headUrl = baseUrl + props.userId + '/files/';
    const tailUrl = props.userId + '.pdf';
    checkFiles(headUrl, tailUrl).then(response => {
      const paths = {}
      let alertForDocuments = false;
      response.forEach(res => {
        if (res.statusText === 'OK') {
          Object.keys(endpoints).forEach(key => {
            if (res.config.url.includes(endpoints[key])) {
              paths[key] = res.config.url;
            }
          });
        } else {
          alertForDocuments = true;
        }
      });

      if ( alertForDocuments ) {
        alert('Falta documentación, por favor, ingrésala para que puedas inscribirte. \n\n' +
              'Sólo se aceptan archivos en formato PDF.')
      }

      setFilePath(paths);
      setFetched(true);
    });
  }, []);

  function handleChange(e) {
    setFile({...file, [e.target.name]: {
      file: e.target.files[0],
      filename: e.target.value.split('\\')[2]
    }});

    setSaveDisabled({...saveDisabled, [e.target.name]: false});
  }

  function handleClick(key) {
    const formData = new FormData();
    formData.append("file", file[key].file);

    const url = baseUrl + props.userId + '/files/' + endpoints[key];
    axios.post(url, formData, {headers: {
      'Content-Type': 'application/pdf'
    }}).then(response => {
      const url = baseUrl + props.userId + '/files/' +
                  `${endpoints[key]}/${endpoints[key]}-` +
                  props.userId + '.pdf';
      axios.head(url).then(res => {
        setFilePath({...filePath, [key]: res.config.url});
        setSaveDisabled({...saveDisabled, [key]: true});
      });
    });
  }

  function handleFormRefresh() {
    const confirms = window.confirm(
      '¿Está seguro que quiere actualizar los datos de su solicitud?\n\n' +
      'Aunque no haya hecho cambios, considere que la solicitud se actualizará ' +
      'con la fecha actual');

    if (confirms) {
      axios.post(baseUrl + props.userId + '/form').then(response => {
        if (response.statusText === 'Created') {
          alert('Solicitud actualizada.')
        }
      })

    }
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5">
        Documentos
      </Typography>

      <Fetching fetched={fetched} />

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow key={'Solicitud'}>
              <TableCell component="th" scope="row">
                <Button href={baseUrl + props.userId + '/documents/solicitud-' + props.userId + '.pdf'} className={classes.button} download target="_blank">{'Solicitud'}</Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  onClick={handleFormRefresh}
                >
                  <RefreshIcon />
                </Button>
              </TableCell>
            </TableRow>
            {Object.keys(file).map(key => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  <Button disabled={filePath[key] ? false : true} href={filePath[key]} className={classes.button} download target="_blank">{key}</Button>
                  <Typography>
                    {saveDisabled[key] ? '' : file[key].filename}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                    <Button
                      component="label"
                    >
                      {filePath[key] ? <React.Fragment><EditIcon />Cambiar</React.Fragment> : <React.Fragment><FileAddIcon /> Agregar</React.Fragment>}
                      <input
                        type="file"
                        accept="application/pdf"
                        name={key}
                        style={{ display: "none" }}
                        onChange={handleChange}
                      />
                    </Button>
                    <Button
                      onClick={() => handleClick(key)}
                      disabled = {saveDisabled[key]}
                    >
                      <SaveIcon />Guardar
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default withCookies(UserFiles);
