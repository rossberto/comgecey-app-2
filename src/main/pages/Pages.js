import React, {useContext} from 'react';
import AppContext from '../../AppContext';
import {renderRoutes} from 'react-router-config'

export default function Pages(props) {
  const appContext = useContext(AppContext);
  const {routes} = appContext;

  return (
    <React.Suspense fallback = <div>Cargando...</div>
    >
      {renderRoutes(routes)}
    </React.Suspense>
  );
}
