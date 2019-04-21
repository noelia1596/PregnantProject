import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';


const Pages = ({match}) => (
  <div className="app-wrapper">
    <Switch>
  
      <Route path={`${match.url}/error-404`} component={asyncComponent(() => import('./routes/404'))}/>
      <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))}/>
    </Switch>
  </div>
);

export default Pages;
