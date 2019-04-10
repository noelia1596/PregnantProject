import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import './css.css';

const TimeLine = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/default`}/>
            <Route path={`${match.url}/default`} component={asyncComponent(() => import('./routes/dafault/index'))}/>
        </Switch>
    </div>
);

export default TimeLine;