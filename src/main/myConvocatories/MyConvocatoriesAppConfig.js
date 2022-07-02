import React from 'react';
import {Redirect} from 'react-router-dom';

export const MyConvocatoriesAppConfig = {
  settings: {
      layout: {
          config: {}
      }
  },
  routes: [
    {
      path: '/myconvocatories/:convocatoryId',
      component: React.lazy(() => import('./MyConvocatory'))
    },
    {
      path: '/myconvocatories',
      component: React.lazy(() => import('./MyConvocatories'))
    }
  ]
};
