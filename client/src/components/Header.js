import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Header.scss';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const Header = (props) => {
  return (
    <AppBar 
    onTitleTouchTap = { () =>  props.history.push('/') }
    className="appbar" 
    title="PollAce">
      <div className="header-list">
        {
          props.authenticated && 
          <FlatButton onClick={ () => props.history.push('/dashboard') } label="MY DASHBOARD"/>
        }

        {
          !props.authenticated && 
          <FlatButton onClick={ () => props.history.push('/signup') } label="SIGNUP"/>
        }

        {
          !props.authenticated && 
          <FlatButton onClick={ () => props.history.push('/login') } label="LOGIN"/>
        }

        {
          props.authenticated && 
          <FlatButton label="LOGOUT" onClick={ props.logout }/>
        }
        
        
      </div>
    </AppBar>
  )
}

export default Header;