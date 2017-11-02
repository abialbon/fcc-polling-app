import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../components/Header';
import LandingPage from '../components/LandingPage';

import Signup from './Signup';
import Login from './Login';
import AllPolls from './AllPolls';
import Poll from './Poll';
import Dashboard from './Dashboard';

class App extends React.Component {
  render() {
    return (
      <div>

        <Route path='/' component={ Header } />
        <Route exact path='/' component={ LandingPage } />
        <Route exact path='/signup' component={ Signup } />
        <Route exact path='/login' component={ Login } />
        <Route exact path='/polls' component={ AllPolls } />
        <Route exact path='/dashboard' component={ Dashboard } />

      </div>
    )
  }
}

export default App;