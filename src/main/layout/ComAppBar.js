import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Blog from '../blog/Blog';
import SignUp from '../signup/Signup';
import LandingPage from '../landing/Landing';
import SuscribeDialog from '../landing/Suscribe';
import InscriptionForm from '../register/InscriptionForm';
import DocumentsUpload from '../documents/DocumentsUpload';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const [page, setPage] = useState(<LandingPage />)

  function handleClick(e) {
    switch (e.target.textContent) {
      case 'Documentos':
        setPage(<DocumentsUpload />)
        break;
      case 'Landing Page':
        setPage(<LandingPage />)
        break;
      case 'Forma de Inscripción':
        setPage(<InscriptionForm />)
        break;
      case 'Blog':
        setPage(<Blog />)
        break;
      default:

    }
    console.log(e.target.textContent);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            onClick={handleClick}
          >
            Documentos
          </Button>
          <Button
            color="inherit"
            onClick={handleClick}
          >
            Landing Page
          </Button>
          <Button
            color="inherit"
            onClick={handleClick}
          >
            Forma de Inscripción
          </Button>
          <Button
            color="inherit"
            onClick={handleClick}
          >
            Blog
          </Button>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
