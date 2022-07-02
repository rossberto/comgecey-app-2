import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import {Grid, Typography} from '@material-ui/core';
import AppContext from '../../AppContext';
import Fetching from '../Fetching';
//import SearchBar from './SearchBar';
import OpenConvocatoriesTable from './OpenConvocatoriesTable';
import MyConvocatoriesTable from './MyConvocatoriesTable';
import { apiUrl } from '../apiUrl';

const userConvsUrl = apiUrl + 'users/';
const convsUrl = apiUrl + 'convocatories';

function createData(convocatory, status) {
  return { convocatory, status };
}

function MyConvocatories(props) {
  const appContext = useContext(AppContext);
  const { userSession } = appContext;

  const [userConvsTitles, setUserConvsTitles] = useState([]);
  const [convsFetched, setConvsFetched] = useState(false);
  const [userConvsFetched, setuserConvsFetched] = useState(false);
  const [userConvsUpdate, setUserConvsUpdate] = useState(false);
  const [filter, setFilter] = useState({searchText:'', filterOption:'Todas'});
  const [convocatories, setConvocatories] = useState([]);
  const [userConvocatories, setUserConvocatories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  //const [searchText, setSearchText] = useState('');


  useEffect(() => {
    const userTitles = userConvocatories.map(item => {
      return item.title;
    });
    setUserConvsTitles(userTitles);
  }, [userConvocatories]);


  useEffect(() => {
    axios.get(convsUrl).then(response => {
      const openConvs = response.data.convocatories.filter(conv => {
        return conv.status === 'Abierta';
      });
      setConvocatories(openConvs);
      setConvsFetched(true);
    });
  }, []);

  useEffect(() => { // userSession.id
    axios.get(userConvsUrl + props.cookies.cookies.userId + '/convocatories').then(response => {
      setUserConvocatories(response.data.userConvocatories);
      setuserConvsFetched(true);
    });
  }, [userConvsUpdate]);

  function handleUpdateUserConvs() {
    setUserConvsUpdate(!userConvsUpdate);
  }

  return (
    <Grid container alignItems="center" direction="column" spacing={3}>
      <Grid item xs={12} sm={10}>
        <Typography align="center" variant="h2" component="h2" gutterBottom style={{alignItems:'center'}}>Convocatorias</Typography>
      </Grid>
      {/*<Grid item xs={12} sm={10}>
        <SearchBar updateFilter={handleUpdateFilter} />
      </Grid>*/}
      <Grid item xs={12} >
        <Typography align="center" variant="h5" component="h5" gutterBottom style={{alignItems:'center'}}>Convocatorias Abiertas</Typography>
        <Fetching fetched={convsFetched} />
        {convsFetched ? <OpenConvocatoriesTable userConvsTitles={userConvsTitles} userId={props.cookies.cookies.userId} convs={convocatories} updateUserConvs={handleUpdateUserConvs} /> : ''}
      </Grid>
      <Grid item xs={12} >
        <Typography align="center" variant="h5" component="h5" gutterBottom style={{alignItems:'center'}}>Mis Convocatorias</Typography>
        <Fetching fetched={userConvsFetched} />
        {userConvsFetched ? <MyConvocatoriesTable userId={props.cookies.cookies.userId} convs={userConvocatories} updateUserConvs={handleUpdateUserConvs} /> : ''}
      </Grid>
    </Grid>
  );
}

export default withCookies(MyConvocatories);
