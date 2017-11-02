import React from 'react';

import '../styles/Auth.scss';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Signup extends React.Component {
  render() {
    return (
      <div className="auth-container">
        <Paper>
          <form>
            <h1>Welcome to PollAce</h1>
            <div className="form-field">
              <TextField 
              floatingLabelText="Name"
              fullWidth={ true }
              />
            </div>
            <div className="form-field">
              <TextField 
              floatingLabelText="Email"
              fullWidth={ true }
              />
            </div>
            <div className="form-field">
              <TextField 
              floatingLabelText="Password"
              type="password"
              fullWidth={ true }
              />
            </div>
            <div className="form-field">
              <RaisedButton className="signup-button" label="SIGNUP"/>
            </div>
          </form>
        </Paper>
      </div>
    )
  }
}