import React from 'react';

import { events } from './App';
import $ from 'jquery';
import Auth from '../modules/clientAuth';
const request = require('superagent');

import '../styles/AddPoll.scss';
import AddPollForm from '../components/AddPollForm';

class AddPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsArray : ['options0', 'options1'],
      form: {}
    }
    this.addOption = () => {
      let options = this.state.optionsArray;
      options.push(`option${options.length}`);
      this.setState({
        optionsArray: options
      })
    }

    // onChange action handler for form inputs
    this.onChange = (e) => {
      let field = e.target.name;
      this.state.form[field] = e.target.value;
    }

    //Form onSubmit handler
    this.onSubmit = (e) => {
      e.preventDefault();
      console.log(this.state.form);
      const token = Auth.getToken();
      request
        .post('/api/polls')
        .set('Authorization', `Bearer ${token}`)
        .send(this.state.form)
        .end((err, res) => {
          if (res.body.success === false) {
            $(events).trigger('snack', ['Please login'])
          } else {
            $(events).trigger('snack', ['Poll added !'])
            this.props.history.push('/dashboard');
          }
        })
    }
  }
  render() {
    return (
      <AddPollForm 
      options= { this.state.optionsArray }
      addOption={ this.addOption.bind(this) }
      onChange={ this.onChange.bind(this) }
      onSubmit={ this.onSubmit.bind(this) }
      />
    )
  }
}

export default AddPoll;