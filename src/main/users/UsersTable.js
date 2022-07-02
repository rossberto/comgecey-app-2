import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Fetching from '../Fetching';
import nav from '../nav';
import { apiUrl } from '../apiUrl';

const baseUrl = apiUrl + 'users/';

const columns = [
  { id: 'name', label: 'Nombre Completo', minWidth: 170 },
  { id: 'code', label: 'Email' },
  {
    id: 'population',
    label: 'Acciones',
    //minWidth: 170,
    align: 'right',
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

  function handleClick(e, userId) {
    nav('/users/' + userId);
  }

  function handleDelete(e, name, userId) {
    const r = window.confirm('Confirmas la eliminación del usuario ' + name + '.')
    if (r) {
      axios.delete(baseUrl + userId).then(response => {
        if (response.status === 204) {
          alert('Se ha eliminado el usuario.');
        }
      });
    }
  }

  return (
    <Paper className={classes.root}>
      <Fetching fetched={props.fetched} />
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
            {props.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell key={index+row.name} align="center">
                    <Button onClick={(e) => handleClick(e, row.id)}>{row.name}</Button>
                  </TableCell>
                  <TableCell key={index+row.email} align="center">
                    <Button name={row.email} onClick={(e) => handleClick(e, 'conv')}>{row.email}</Button>
                  </TableCell>
                  <TableCell key={index+'del-'+row.name} align="center">
                    <Button onClick={(e) => handleDelete(e, row.name, row.id)}><DeleteIcon /></Button>
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
        count={props.users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
