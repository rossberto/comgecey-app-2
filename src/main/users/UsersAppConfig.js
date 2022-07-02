import React from 'react';
import {Redirect} from 'react-router-dom';

export const UsersAppConfig = {
  settings: {
      layout: {
          config: {}
      }
  },
  routes: [
    {
      path: '/users/:userId',
      component: React.lazy(() => import('./Profile'))
    },
    {
      path: '/users',
      component: React.lazy(() => import('./Users'))
    },
    {
      path: '/user',
      component: () => <Redirect to="/users" />
    }
  ]
};
