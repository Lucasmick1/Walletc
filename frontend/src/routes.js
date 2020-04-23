import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Register from './pages/Registro';
import Logon from './pages/Logon';
import Profile from './pages/Profile';
import AddContas from './pages/Contas';
import Settings from './pages/Settings';




export default function Routes(){
    return (
        <BrowserRouter>
        <Switch>
        <Route path="/" exact component={Logon}/>
        <Route path="/register" component={Register}/>
        <Route path="/users/contas" exact component={Profile}/>
        <Route path="/users/contas/add" component={AddContas}/>
        <Route path="/teste" exact component={Settings}/>

        </Switch>
        </BrowserRouter>
    )
}