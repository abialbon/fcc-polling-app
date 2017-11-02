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
        <FlatButton onClick={ () => props.history.push('/signup') } label="SIGNUP"/>
        <FlatButton onClick={ () => props.history.push('/login') } label="LOGIN"/>
        <FlatButton label="LOGOUT"/>
      </div>
    </AppBar>
  )
}

export default Header;