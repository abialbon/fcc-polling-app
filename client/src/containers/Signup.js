import React from 'react';

import '../styles/Auth.scss';
import SignupForm from '../components/SignupForm';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
    this.onChange = (e) => {
      const field = e.target.name;
      const value = e.target.value;
      this.state.user[field] = value;
    }
    this.onSubmit = (e) => {
      e.preventDefault();
      // Logic to handle Signup
    }
  }

  render() {
    return (
      <div className="auth-container">
        <SignupForm 
        onChange={ this.onChange }
        onSubmit={ this.onSubmit }
        />
      </div>
    )
  }
}