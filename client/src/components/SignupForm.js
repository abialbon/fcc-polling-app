import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const SignupForm = ({ onChange, onSubmit }) => (
  <Paper>
  <form method="POST" action="/" onSubmit={ onSubmit } >
    <h1>Welcome to PollAce</h1>
    <div className="form-field">
      <TextField 
      name="name"
      floatingLabelText="Name"
      fullWidth={ true }
      onChange={ onChange }
      />
    </div>
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
    <RaisedButton type="submit" className="signup-button" label="SIGNUP"/>
    </div>
  </form>
</Paper>
)

export default SignupForm;