import React from 'react';
const request = require('superagent');

import '../styles/Auth.scss';
import SignupForm from '../components/SignupForm';
import { redA700, greenA700 } from 'material-ui/styles/colors';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      errors: {
        name: '',
        email: '',
        password: ''
      }
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
        .post('/auth/signup')
        .send(this.state.user)
        .end((err, res) => {
          if (err) { console.log(err.message); return; }
          if (res.body.success === false) {
            this.setState({
              errors: {
                name: res.body.name || '',
                email: res.body.email || '',
                password: res.body.password || ''
              }
            });
          } else {
            this.props.setMessage({
              color: greenA700,
              text: 'Signup successful. Login to continue'
            });
            this.props.history.push('/login');
          }
        })
    }
  }

  render() {
    return (
      <div className="auth-container">
        <SignupForm 
        onChange={ this.onChange }
        onSubmit={ this.onSubmit }
        errors={ this.state.errors }
        />
      </div>
    )
  }
}