import React from 'react';

import { Route } from 'react-router-dom';

import Header from './Header';
import LandingPage from './LandingPage';

import Signup from '../containers/Signup';
import Login from '../containers/Login';
import AllPolls from '../containers/AllPolls';
import Poll from '../containers/Poll';
import Dashboard from '../containers/Dashboard';

// ***********************
// Wrapped route components
// ***********************

const HeaderData = ({ component: Component, authenticated, ...rest }) => (
  <Route { ...rest } render={ props=> (
    <Component { ...props } authenticated={ authenticated }/>
  ) } />
)

// ***********************


const Routes = ({
  authenticated
}) => (

  <div>
  <HeaderData path="/" component={ Header } authenticated={ authenticated } />
  <Route exact path='/' component={ LandingPage } />
  <Route exact path='/signup' component={ Signup } />
  <Route exact path='/login' component={ Login } />
  <Route exact path='/polls' component={ AllPolls } />
  <Route exact path='/dashboard' component={ Dashboard } />
  <Route exact path={'/poll/:id'} component={ Poll } />
  </div>

)

export default Routes;