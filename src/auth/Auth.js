import React, { useState, useEffect, useContext } from 'react';
import { withCookies, CookiesProvider } from 'react-cookie';
import SignIn from '../main/signin/SignIn';
import Pages from '../main/pages/Pages';
import AppContext from '../AppContext';


function Auth(props) {
  const appContext = useContext(AppContext);
  const { routes, history } = appContext;

  const [auth, setAuth] = useState(false);

  // User session on cookies verification
  useEffect(() => {

    if (props.cookies.cookies.userId) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [props.cookies.cookies]);

  return (
    <CookiesProvider>
      {auth ? <React.Fragment children={props.children} /> : <SignIn />}
    </CookiesProvider>
  );
}

export default withCookies(Auth);
