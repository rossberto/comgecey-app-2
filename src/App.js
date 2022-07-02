import React, { useState, useContext, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import { CookiesProvider } from 'react-cookie';
import AppContext from './AppContext';
import routes from './configs/routesConfig';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Pages from './main/pages/Pages';
import Layout from './main/layout/Layout';
import Blog from './main/blog/Blog';
import history from './main/history';
import Auth from './auth/Auth';
import PwdRecovery from './main/signin/PwdRecovery';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#111f22',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#7a6800',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

function App() {
  const appContext = useContext(AppContext);
  const [auth, setAuth] = useState(false);
  const [userSession, setUserSession] = useState({});

  function goDashboard(val, userId) {
    setAuth(val);
    if (val===true) {
      history.push('/users/' + userId);
    } else {
      history.push('/signin');
    }
  }
  return (
    <AppContext.Provider
      value={{
        routes,
        auth,
        goDashboard,
        userSession,
        setUserSession
      }}
    >

        <ThemeProvider theme={theme}>
            <Router history={history}>
              <Switch>
                <Route exact path="/recover">
                  <PwdRecovery history={history} />
                </Route>

                <Route path="/">
                  <Auth history={history}>
                    <Layout />
                  </Auth>
                </Route>
              </Switch>
            </Router>
        </ThemeProvider>

    </AppContext.Provider>
  );
}

export default App;
