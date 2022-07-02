import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Paper, Grid, TextField, Button, Typography} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Fetching from './Fetching';
import { apiUrl } from '../../apiUrl';

const baseUrl = apiUrl + 'users/';

const professionalInfo = {
  endpoint: '/professional',
  school: '',
  start_date: '',
  finish_date: '',
  intership: '',
  start_date_internship: '',
  finish_date_internship: '',
  social_service: '',
  start_date_social: '',
  finish_date_social: '',
  exam_date: '',
  exam_type: '',
  tesis: '',
  professional_id: '',
  professional_id_date: '',
  book: '',
  ssa: ''
}

export default function ProfessionalInfo(props) {
  const [fetched, setFetched] = useState(false);
  const [editDisabled, setEditDisabled] = useState(false);
  const [info, setInfo] = useState(professionalInfo);

  useEffect(() => {
    const url = baseUrl + props.userId + '/professional';
    axios.get(url).then(response => {
      const professionalData = Object.assign({}, response.data.professional);

      const dates = ['start_date', 'finish_date', 'start_date_internship', 'finish_date_internship', 'start_date_social', 'finish_date_social', 'exam_date', 'professional_id_date']
      dates.forEach(date => {
        professionalData[date] = professionalData[date].slice(0, 10);
      });

      setInfo(professionalData);
      setFetched(true);
    });
  }, []);

  function handleEdit() {
    setEditDisabled(true);
  }

  function handleSave() {
    const url = baseUrl + props.userId + '/professional';
    axios.put(url, info);

    setEditDisabled(false);
  }

  function handleChange(e) {
    e.preventDefault();

    const key = e.target.name;
    const value = e.target.value;
    setInfo({...info, [key]:value})
  }

  return (
    <React.Fragment>
      <Grid container justify="space-between">
        <Grid item>
          <Typography component="h1" variant="h5">
            Licenciatura
          </Typography>
        </Grid>
        <Grid item>
          <Fetching fetched={fetched} />
        </Grid>
        <Grid item>
          <Button disabled={!editDisabled} onClick={handleSave}><SaveIcon /></Button>
          <Button disabled={editDisabled} onClick={handleEdit}><EditIcon /></Button>
        </Grid>
      </Grid>
      <form className={props.classes.form} noValidate onChange={handleChange}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="school"
              required
              fullWidth
              id="school"
              label="Escuela donde estudió la licenciatura"
              autoFocus
              size="small"
              value={info.school}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="start_date"
              label="Fecha de Inicio"
              type="date"
              id="start_date"
              InputLabelProps={{shrink: true}}
              size="small"
              value={info.start_date}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="finish_date"
              label="Fecha de Terminación"
              type="date"
              id="finish_date"
              InputLabelProps={{shrink: true}}
              size="small"
              value={info.finish_date}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="intership"
              label="Sitio donde realizó el internado"
              name="intership"
              size="small"
              value={info.intership}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="start_date_internship"
              label="Inicio de Internado"
              type="date"
              id="start_date_internship"
              InputLabelProps={{shrink: true}}
              size="small"
              value={info.start_date_internship}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="finish_date_internship"
              label="Fin de Internado"
              type="date"
              id="finish_date_internship"
              InputLabelProps={{shrink: true}}
              size="small"
              value={info.finish_date_internship}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="social_service"
              label="Lugar donde realizó el servicio social"
              name="social_service"
              size="small"
              value={info.social_service}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="start_date_social"
              label="Inicio de Servicio Social"
              type="date"
              id="start_date_social"
              InputLabelProps={{shrink: true}}
              size="small"
              value={info.start_date_social}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="finish_date_social"
              label="Fin de Servicio Social"
              type="date"
              id="finish_date_social"
              InputLabelProps={{shrink: true}}
              size="small"
              value={info.finish_date_social}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="exam_date"
              label="Fecha de Examen Profesional"
              type="date"
              id="exam_date"
              InputLabelProps={{shrink: true}}
              size="small"
              value={info.exam_date}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="exam_type"
              label="Tipo de Examen (Oral y/o Escrito)"
              id="exam_type"
              size="small"
              value={info.exam_type}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="tesis"
              label="Título de la Tesis Recepcional"
              id="tesis"
              size="small"
              value={info.tesis}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="professional_id"
              label="Número de Cédula Profesional"
              id="professional_id"
              size="small"
              value={info.professional_id}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="professional_id_date"
              label="Fecha de Expedición de Cédula Profesional"
              type="date"
              id="professional_id_date"
              InputLabelProps={{shrink: true}}
              size="small"
              value={info.professional_id_date}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="book"
              label="Libro, Fojas y Número"
              id="book"
              size="small"
              value={info.book}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="ssa"
              label="Registro en la SSA"
              id="ssa"
              size="small"
              value={info.ssa}
              InputProps={{
                readOnly: !editDisabled,
              }}
              variant={editDisabled ? "standard" : "filled"}
            />
          </Grid>

        </Grid>
      </form>
    </React.Fragment>
  );
}
