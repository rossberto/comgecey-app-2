import React from 'react';
import {Redirect} from 'react-router-dom';

import {UsersAppConfig} from '../main/users/UsersAppConfig';
import {ConvocatoriesAppConfig} from '../main/convocatories/ConvocatoriesAppConfig';
import {MyConvocatoriesAppConfig} from '../main/myConvocatories/MyConvocatoriesAppConfig';
import {LandingAppConfig} from '../main/landing/LandingAppConfig';
import {SignInAppConfig} from '../main/signin/SignInAppConfig';
import generateRoutesFromConfigs from './fuseRouting';

const routeConfigs = [
    SignInAppConfig,
    UsersAppConfig,
    ConvocatoriesAppConfig,
    MyConvocatoriesAppConfig,
    LandingAppConfig
];


const routes = [
  ...generateRoutesFromConfigs(routeConfigs, ['Admin', 'Planner', 'Couple', 'Provider']),
  {
      path     : '/',
      exact    : true,
      component: () => <Redirect to="/signin" />
  },
  {
      component: () => <Redirect to="/users"/>
  }
];

export default routes;
