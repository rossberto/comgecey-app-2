import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead,
         TablePagination, TableRow, Button, Typography } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import StopIcon from '@material-ui/icons/Stop';
import { apiUrl } from '../apiUrl';
import nav from '../nav';

const baseUrl = apiUrl + 'users/';

const columns = [
  { id: 'code', label: 'Convocatoria', align: 'center' },
  { id: 'name', label: 'Estado', minWidth: 170, align: 'center' },
  {
    id: 'population',
    label: 'Acciones',
    //minWidth: 170,
    align: 'center',
    format: value => value.toLocaleString(),
  },
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

export default function UsersTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleClick(id) {
    nav('/myconvocatories/' + id);
  }

  function handleSuscribe(id) {
    const url = baseUrl + props.userId + '/convocatories';
    axios.post(url, {convocatoryId: id}).then(response => {
      if (response.status === 201) {
        alert('Tu solicitud ha sido enviada.');
        props.updateUserConvs();
      } else {
        alert('Hubo un problema, favor de intentar nuevamente más tarde.');
      }
    });
  }

  return (
    <Paper className={classes.root}>
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
            {props.convs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell key={row.title} align="center">
                    <Button name={row.id} onClick={() => handleClick(row.id)}>{row.title}</Button>
                  </TableCell>
                  <TableCell key={row.status} align="center">
                    <Typography variant="button" gutterBottom>{row.status}</Typography>
                  </TableCell>
                  <TableCell key="icon" align="center">
                    <Button disabled={props.userConvsTitles.includes(row.title)} onClick={() => handleSuscribe(row.id)}>{row.status === 'Abierta' ? 'Inscribirme' : ''}</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.convs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
