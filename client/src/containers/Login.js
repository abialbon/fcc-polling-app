import React from 'react';
const request = require('superagent');
import Auth from '../modules/clientAuth';

import '../styles/Auth.scss';
import LoginForm from '../components/LoginForm';
import { redA700, greenA700 } from 'material-ui/styles/colors';

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
      request
        .post('/auth/login')
        .send(this.state.user)
        .end((err, res) => {
          if (res.body.success === false) {
            this.props.setMessage({
              color: redA700,
              text: res.body.error
            })
          } else {
            Auth.authenticate(res.body.token);
            this.props.userAuthenticate(res.body.user);
            this.props.history.push('/dashboard');
          }
        })
    }
  }
  
  render() {
    return (
      <LoginForm 
      onChange = { this.onChange }
      onSubmit = { this.onSubmit }
      message = { this.props.message }
      />
    )
  }
}