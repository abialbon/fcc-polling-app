import React from 'react';

import { Route } from 'react-router-dom';

import Header from './Header';
import LandingPage from './LandingPage';

import Signup from '../containers/Signup';
import Login from '../containers/Login';
import AllPolls from '../containers/AllPolls';
import Poll from '../containers/Poll';
import Dashboard from '../containers/Dashboard';
import AddPoll from '../containers/AddPoll';

// ***********************
// Wrapped route components
// ***********************

const RouteData = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={ props=> (
    <Component { ...props } { ...rest }/>
  ) } />
)

// ***********************


const Routes = ({
  user,
  authenticated,
  message,
  setMessage,
  userAuthenticate,
  logout
}) => (

  <div>
  <RouteData path="/" component={ Header } 
  authenticated={ authenticated } 
  logout={ logout }
  />

  <Route exact path='/' component={ LandingPage } />

  <RouteData exact path='/signup' component={ Signup } setMessage={ setMessage }/>
  
  <RouteData exact path='/login' component={ Login } 
  authenticated={ authenticated } 
  setMessage={ setMessage } 
  message={ message }
  userAuthenticate={ userAuthenticate }
  />

  <Route exact path='/polls' component={ AllPolls } />

  <RouteData exact path='/dashboard' component={ Dashboard } 
  user={ user }/>

  <Route exact path={'/addpoll'} component={ AddPoll } />

  <Route exact path={'/poll/:id'} component={ Poll } />

  </div>

)

export default Routes;