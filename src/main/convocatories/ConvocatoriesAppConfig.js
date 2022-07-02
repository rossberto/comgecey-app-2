import React from 'react';
import {Redirect} from 'react-router-dom';

export const ConvocatoriesAppConfig = {
  settings: {
      layout: {
          config: {}
      }
  },
  routes: [
    {
      path: '/convocatories/:convocatoryId',
      component: React.lazy(() => import('./Convocatory'))
    },
    {
      path: '/convocatories',
      component: React.lazy(() => import('./Convocatories'))
    }
  ]
};
