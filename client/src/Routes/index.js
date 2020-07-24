import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from'../pages/Dashboard';

const index = () =>{
    return (
<BrowserRouter>
<Switch>
<Route path='/' exact component={Login}/>
<Route path='/dashboard' component={Dashboard}/>
</Switch>
</BrowserRouter>
    )
}

export default index;