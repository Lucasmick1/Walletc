import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Register from './pages/Registro';
import Logon from './pages/Logon';
import Profile from './pages/Profile';
import addContas from './pages/Contas';





export default function Routes(){
    return (
        <BrowserRouter>
        <Switch>
        <Route path="/" exact component={Logon}/>
        <Route path="/register" component={Register}/>
        <Route path="/users/contas" exact component={Profile}/>
        <Route path="/users/contas/add" component={addContas}/>
        </Switch>
        </BrowserRouter>
    )
}