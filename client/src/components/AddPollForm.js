import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { lightBlueA400, redA400 } from 'material-ui/styles/colors';

const AddPollForm = ({ options, addOption, onChange, onSubmit }) => {
  return (
    <Paper className="addpoll-container">
    <form action="/" method="POST" onSubmit={ onSubmit }>
      <h1>Add A New Poll</h1>
      <div className="form-field">
        <TextField 
        name="stem"
        floatingLabelText="Your question"
        fullWidth={ true }
        onChange={ onChange }
        />
      </div>
      <div className="options-field form-field">
        {
          options.map((x, i) => (
            <TextField 
            key={ i }
            name={ x }
            floatingLabelText={ `Option ${i + 1}` }
            onChange={ onChange }
            />
          ))
        }
      </div>
      <div className="button-field">
      <RaisedButton 
        className="option"
        labelColor={ '#ffffff' }
        backgroundColor={ lightBlueA400 }
        label="ADD AN OPTION"
        onClick={ addOption }
      />
      <RaisedButton 
        backgroundColor ={ redA400 }
        labelColor={ '#ffffff' }
        label="SUBMIT"
        type="submit"
      />
      </div>
    </form>
  </Paper>
  )
}

export default AddPollForm;