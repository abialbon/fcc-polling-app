import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { tealA400 } from 'material-ui/styles/colors';

const LoginForm = ({ onChange, onSubmit, message }) => (
  <div className="auth-container">
    <Paper className="form-container">
      <form action="/" method="POST" onSubmit={ onSubmit }>
        <h1>Login</h1>
        {
          message.text && <div style={{ color: message.color }} className="status-text">{ message.text }</div>
        }
        <div className="form-field">
          <TextField 
          name="email"
          floatingLabelText="Email"
          fullWidth={ true }
          onChange={ onChange }
          />
        </div>
        <div className="form-field">
          <TextField 
          name="password"
          floatingLabelText="Password"
          type="password"
          fullWidth={ true }
          onChange={ onChange }
          />
        </div>
        <div className="form-field">
          <RaisedButton 
          type="submit" 
          className="signup-button" 
          label="LOGIN"
          labelStyle={ { color: '#ffffff'} }
          backgroundColor={ tealA400 }/>
        </div>
      </form>
    </Paper>
  </div>
)

export default LoginForm;