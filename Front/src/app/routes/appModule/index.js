import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import asyncComponent from '../../../util/asyncComponent';

const AppModule = ({match}) => (
  <div className="app-wrapper h-100">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/login-1`}/>
      <Route path={`${match.url}/login-1`} component={asyncComponent(() => import('./routes/login/Login1'))}/>
      <Route path={`${match.url}/sign-up-1`} component={asyncComponent(() => import('./routes/signUp/SignUP1'))}/>
      <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))}/>
    </Switch>
  </div>
);

export default AppModule;
