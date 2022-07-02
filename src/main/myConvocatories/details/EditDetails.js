import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import Fetching from '../../Fetching';

export default function EditDetails(props) {
  function handleEditEnable() {
    props.enableEdit(props.name);
  }

  function handleSave() {
    props.handleSave(props.name);
  }

  return (
    <Grid container direction="row" justify="space-between" >
      <Grid item>
        <Typography component="h1" variant="h5">
          {props.title}
        </Typography>
      </Grid>
      <Grid item>
        <Fetching fetched={props.fetched} />
      </Grid>
    </Grid>
  );
}
