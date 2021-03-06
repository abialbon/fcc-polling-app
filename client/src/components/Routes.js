import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import Auth from '../modules/clientAuth';

import Header from '../containers/Header';
import LandingPage from '../containers/LandingPage';

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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={ props => (
    Auth.isAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    )
  )} />
)

// ***********************


const Routes = ({
  appIP,
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

  <RouteData exact path='/' component={ LandingPage } 
  authenticated={ authenticated }/>

  <RouteData exact path='/signup' component={ Signup } setMessage={ setMessage }/>
  
  <RouteData exact path='/login' component={ Login } 
  authenticated={ authenticated } 
  setMessage={ setMessage } 
  message={ message }
  userAuthenticate={ userAuthenticate }
  />

  <RouteData exact path='/polls' component={ AllPolls } 
  user={user}/>

  <PrivateRoute exact path='/dashboard' component={ Dashboard } 
  user={ user }/>

  <PrivateRoute exact path={'/addpoll'} component={ AddPoll } />

  <RouteData exact path={'/poll/:id'} component={ Poll } 
  user={ user }
  appIP={ appIP }/>

  </div>

)

export default Routes;