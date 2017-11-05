import React from 'react';

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
  }

  componentDidMount() {
    request
      .get('/api/polls')
      .end((err, res) => {
        if (err) {
          // TODO: handle the error
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
          <div className="polls-welcome--buttons">
            <FlatButton 
            backgroundColor={ lightBlueA400 }
            labelStyle={{ color: 'white'}} 
            label="Signup"
            />
            <FlatButton 
            backgroundColor={ redA400 }
            labelStyle={{ color: 'white'}} 
            label="Login" 
            />
          </div>
        </div>
        <Paper className="poll-area">
          {
            this.state.polls.map((poll, i) => (
            <PollCard 
            key={ i }
            name={ poll.authorName } 
            stem={ poll.stem }
            pollID={ poll._id }
            context="allpolls"
            history={ this.props.history }
            />
          ))
          }
        </Paper>
      </div>
    )
  }
}