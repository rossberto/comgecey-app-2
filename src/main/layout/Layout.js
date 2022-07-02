import React, {useContext, useState, useEffect} from 'react';
import AppContext from '../../AppContext';
import {renderRoutes} from 'react-router-config'

import Frame from './Frame';
import DocumentsUpload from '../documents/DocumentsUpload';
import Users from '../users/Users';
import Profile from '../users/Profile';
import Convocatory from '../convocatories/Convocatory';
import Convocatories from '../convocatories/Convocatories';

import spinner from './91.gif'

export default function Layout(props) {
  const appContext = useContext(AppContext);
  const {routes} = appContext;

  return (
    <div>
      <Frame>
        <React.Suspense
          fallback = <h1>Cargando...</h1>
        >
          {renderRoutes(routes)}
        </React.Suspense>
      </Frame>
    </div>

  );
}
