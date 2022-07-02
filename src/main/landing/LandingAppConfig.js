import React from 'react';
import {Redirect} from 'react-router-dom';

export const LandingAppConfig = {
  settings: {
      layout: {
          config: {}
      }
  },
  routes: [
    {
      path: '/landing',
      component: React.lazy(() => import('./Landing'))
    }
  ]
};
