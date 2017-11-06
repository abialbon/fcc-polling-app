import React from 'react';

import '../styles/Header.scss';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleToggle = () => this.setState( { open: !this.state.open })
    this.handleClose = () => this.setState({ open: false })
  }
  render() {
    return (
      <div>
      <Drawer 
      docked={false }
      width={ 200 }
      open={ this.state.open }
      onRequestChange={ (open) => this.setState({ open }) }
      >

      <MenuItem onClick={() => {this.props.history.push('/polls'); this.handleClose()} }>All Polls</MenuItem>
      <hr />

      { !this.props.authenticated && 
        <MenuItem onClick={() => {this.props.history.push('/signup'); this.handleClose()} }>Signup</MenuItem>
      }
      { !this.props.authenticated && 
        <MenuItem onClick={() => {this.props.history.push('/login'); this.handleClose()} }>Login</MenuItem>
      }
      { this.props.authenticated && 
        <MenuItem onClick={() => {this.props.history.push('/dashboard'); this.handleClose()} }>My Dashboard</MenuItem>
      }
      { this.props.authenticated && 
        <MenuItem onClick={() => {this.props.logout(); this.handleClose()} }>Logout</MenuItem>
      }

      </Drawer>
      <AppBar 
      onLeftIconButtonTouchTap = { this.handleToggle }
      onTitleTouchTap = { () =>  this.props.history.push('/') }
      className="appbar" 
      title="PollAce">
        <div className="header-list">
          {
            this.props.authenticated && 
            <FlatButton onClick={ () => this.props.history.push('/dashboard') } label="MY DASHBOARD"/>
          }

          {
            !this.props.authenticated && 
            <FlatButton onClick={ () => this.props.history.push('/signup') } label="SIGNUP"/>
          }

          {
            !this.props.authenticated && 
            <FlatButton onClick={ () => this.props.history.push('/login') } label="LOGIN"/>
          }

          {
            this.props.authenticated && 
            <FlatButton label="LOGOUT" onClick={ this.props.logout }/>
          }
        </div>
      </AppBar>
      </div>
    )
  }
}

export default Header;