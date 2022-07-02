import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Fetching from '../../Fetching';
import nav from '../../nav.js';
import { apiUrl } from '../../apiUrl';

const baseUrl =  apiUrl + 'convocatories/';

const columns = [
  { id: 'completeName', label: 'Nombre Completo', minWidth: 170 },
  { id: 'status', label: 'Estatus' },
  { id: 'actions', label: 'Acciones', //minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString() },
];

function createData(name, status, actions) {
  return { name, status, actions };
}

const rows = [
  createData('Christian Eduardo Boyain de Goytia y Luna', <VisibilityIcon />, <DeleteIcon />),
  createData('Diana Iveth Sierra Gomez', <VisibilityIcon />, <DeleteIcon />),
  createData('Jorge Alberto Fonz Aguilar', <VisibilityIcon />, <DeleteIcon />),
  createData('Gloria Yaneth Calderón Loeza', <VisibilityIcon />, <DeleteIcon />),
  createData('Francisco Calderón Ojeda', <VisibilityIcon />, <DeleteIcon />),
  createData('Diana Iveth Sierra Gomez', '', <DeleteIcon />),
  createData('Jorge Alberto Fonz Aguilar', <VisibilityIcon />, <DeleteIcon />),
  createData('Gloria Yaneth Calderón Loeza', <VisibilityIcon />, <DeleteIcon />),
  createData('Francisco Calderón Ojeda', '', <DeleteIcon />),
  createData('Diana Iveth Sierra Gomez', '', <DeleteIcon />),
  createData('Jorge Alberto Fonz Aguilar', <VisibilityIcon />, <DeleteIcon />),
  createData('Gloria Yaneth Calderón Loeza', <VisibilityIcon />, <DeleteIcon />),
  createData('Francisco Calderón Ojeda', <VisibilityIcon />, <DeleteIcon />),
  createData('Diana Iveth Sierra Gomez', '', <DeleteIcon />),
  createData('Jorge Alberto Fonz Aguilar', <VisibilityIcon />, <DeleteIcon />),
  createData('Gloria Yaneth Calderón Loeza', <VisibilityIcon />, <DeleteIcon />),
];

const useStyles = makeStyles({
  root: {
    //maxWidth: '600px',

  },
  container: {
    //maxHeight: 440,
    justify:"center"
  },
});

export default function Suscribers(props) {
  const classes = useStyles();

  const [fetched, setFetched] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const url = baseUrl + props.convocatoryId + '/suscribers';
    axios.get(url).then(response => {
      setUsers(response.data.suscribers);
      setFetched(true);
    });
  }, [refresh]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleClick(columnId, userId, completeName) {
    if (columnId === 'completeName') {
      nav('/users/' + userId); // Go to User Profile
    } else {
      const r = window.confirm(`¿Confirma la eliminación de ${completeName} de esta convocatoria?`);

      if (r) {
        const url = baseUrl + props.convocatoryId + '/suscribers/' + userId;
        axios.delete(url).then(response => {
          if (response.status === 204) {
            alert('Se ha quitado el usuario de la convocatoria.');
            setRefresh(!refresh);
          }
        });
      }
    }
  }

  return (
    <Paper className={classes.root}>
      <Fetching fetched={fetched} />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map(column => {
                    const value = row[column.id];
                    console.log(value);
                    return (
                      <TableCell key={column.id} align="left">
                        { column.id === 'status' ?
                            <Typography variant="button" display="block" gutterBottom>{value}</Typography> :
                            <Button disabled={false} onClick={(e) => handleClick(column.id, row.id, row.completeName)}>{column.id === 'completeName' ? value : <DeleteIcon />/*column.format && typeof value === 'number' ? column.format(value) : value*/}</Button>
                        }
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
