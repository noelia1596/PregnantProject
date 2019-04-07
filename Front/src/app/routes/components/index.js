import React from 'react';
import {Route, Switch} from 'react-router-dom';

import asyncComponent from '../../../util/asyncComponent';


const Components = ({match}) => (
  <div className="app-wrapper">
    <Switch>
     
      <Route path={`${match.url}/buttons`} component={asyncComponent(() => import('./routes/button'))}/>
      <Route path={`${match.url}/button-group`} component={asyncComponent(() => import('./routes/buttonGroup'))}/>
      <Route path={`${match.url}/carousel`} component={asyncComponent(() => import('./routes/carousel'))}/>
      <Route path={`${match.url}/dialogs`} component={asyncComponent(() => import('./routes/dialogs'))}/>
     
     
      <Route path={`${match.url}/list`} component={asyncComponent(() => import('./routes/list'))}/>
      <Route path={`${match.url}/pickers`} component={asyncComponent(() => import('./routes/pickers'))}/>
      <Route path={`${match.url}/popovers`} component={asyncComponent(() => import('./routes/popovers'))}/>
      <Route path={`${match.url}/progressbar`} component={asyncComponent(() => import('./routes/progressbar'))}/>
      <Route path={`${match.url}/selects`} component={asyncComponent(() => import('./routes/selects'))}/>
      <Route path={`${match.url}/stepper`} component={asyncComponent(() => import('./routes/stepper'))}/>
      <Route path={`${match.url}/tables`} component={asyncComponent(() => import('./routes/tables'))}/>
      <Route path={`${match.url}/tabs`} component={asyncComponent(() => import('./routes/tabs'))}/>
      <Route path={`${match.url}/text-fields`} component={asyncComponent(() => import('./routes/textFields'))}/>

      <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))}/>
    </Switch>
  </div>
);

export default Components;
