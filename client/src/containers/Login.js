import React from 'react';

import '../styles/Auth.scss';
import LoginForm from '../components/LoginForm';

export default class Login extends React.Component {
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
      <LoginForm 
      onChange = { this.onChange }
      onSubmit = { this.onSubmit }
      />
    )
  }
}