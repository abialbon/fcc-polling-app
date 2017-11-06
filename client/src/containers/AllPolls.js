import React from 'react';

import { events } from './App';
import $ from 'jquery';

import Auth from '../modules/clientAuth';
import request from 'superagent';
import PollCard from '../components/PollCard';

import '../styles/AllPolls.scss';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { lightBlueA400, redA400 } from 'material-ui/styles/colors';

export default class AllPolls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: []
    }
    // Delete a user poll
    this.deletePoll= (pollID, i) => {
      const token = Auth.getToken();
      request
        .delete(`/api/polls/${ pollID }`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            $(events).trigger('snack', ['Some problem occured !'])
          } else {
            if (res.body.success) {
              $(events).trigger('snack', ['Poll deleted !'])
              let tempPolls = this.state.polls;
              tempPolls.splice(i, 1)
              this.setState({
                polls: tempPolls
              })
            }
          }
        })
    } 
  }

  componentDidMount() {
    request
      .get('/api/polls')
      .end((err, res) => {
        if (err) {
          $(events).trigger('snack', ['Error: Please refresh the page'])
        } else {
          if (res.body.success) {
            this.setState({
              polls: res.body.data
            })
          }
        }
      })
  }

  render() {
    return (
      <div className="polls-container">
        <div className="polls-welcome">
          <h1>All Polls</h1>
          {
            !Auth.isAuthenticated() &&

            <div className="polls-welcome--buttons">
              <FlatButton 
              backgroundColor={ lightBlueA400 }
              labelStyle={{ color: 'white'}} 
              label="Signup"
              onClick={ () => this.props.history.push('/signup') }
              />
              <FlatButton 
              backgroundColor={ redA400 }
              labelStyle={{ color: 'white'}} 
              label="Login"
              onClick={ () => this.props.history.push('/login') }
              />
            </div>
          }
        </div>
        <Paper className="poll-area">
          {
            this.state.polls.map((poll, i) => (
            <PollCard 
            key={ i }
            name={ poll.authorName } 
            author={ poll.author }
            stem={ poll.stem }
            pollID={ poll._id }
            appUser={ this.props.user._id }
            history={ this.props.history }
            deletePoll={ this.deletePoll }
            index={ i } 
            />
          ))
          }
        </Paper>
      </div>
    )
  }
}