import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, TextField, Button, Typography,
          AppBar, Tabs, Tab, Box } from '@material-ui/core';
import IdInfo from './details/IdInfo';
import UserFiles from './UserFiles';
import ProfessionalInfo from './details/ProfessionalInfo';
import AddressInfo from './details/AddressInfo';
import MailAddressInfo from './details/MailAddressInfo';
import AppContext from '../../AppContext';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimpleTabs(props) {
  const classes = useStyles();
  const appContext = useContext(AppContext);

  const { auth, goDashboard, routes, userSession, setUserSession } = appContext;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
    <Grid direction="column" container spacing={3} alignItems="stretch">
      <Grid item xs={12}>
        <Typography align="center" variant="h2" component="h2" gutterBottom style={{alignItems:'center'}}>Perfil de Médico</Typography>
      </Grid>
      <Grid item xs={12} >
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Personal" {...a11yProps(0)} />
            <Tab label="Domicilios" {...a11yProps(1)} />
            <Tab label="Profesional" {...a11yProps(2)} />
            <Tab label="Documentos" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <Paper className={classes.paper}>
              <IdInfo userId={props.cookies.cookies.is_admin === '1' ? props.match.params.userId : props.cookies.cookies.userId} classes={classes}/>
          </Paper>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Paper className={classes.paper}>
            <AddressInfo userId={props.cookies.cookies.is_admin === '1' ? props.match.params.userId : props.cookies.cookies.userId} classes={classes} />
          </Paper>
          <br />
          <Paper className={classes.paper}>
            <MailAddressInfo userId={props.cookies.cookies.is_admin === '1' ? props.match.params.userId : props.cookies.cookies.userId} classes={classes} />
          </Paper>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Paper className={classes.paper}>
            <ProfessionalInfo userId={props.cookies.cookies.is_admin === '1' ? props.match.params.userId : props.cookies.cookies.userId} classes={classes} />
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Paper className={classes.paper}>
            <UserFiles userId={props.cookies.cookies.is_admin === '1' ? props.match.params.userId : props.cookies.cookies.userId} classes={classes}/>
          </Paper>
        </TabPanel>
      </Grid>
    </Grid>
    </div>
  );
}

export default withCookies(SimpleTabs);
