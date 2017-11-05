import React from 'react';

const request = require('superagent');
import Auth from '../modules/clientAuth';
import PollCard from '../components/PollCard';

import '../styles/Dashboard.scss';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { lightBlueA400, redA400 } from 'material-ui/styles/colors';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: []
    }

    this.fetch =() => {
      const token = Auth.getToken();
      request
        .get(`/api/polls/user/${this.props.user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          this.setState({
            polls: res.body.data
          })
        })
    }

    // Delete a user poll
    this.deletePoll= (pollID, i) => {
      const token = Auth.getToken();
      request
        .delete(`/api/polls/${ pollID }`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            // TODO: Handle the error
          } else {
            if (res.body.success) {
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
    if (this.props.user._id) {
      this.fetch();
    }
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-welcome">
          <h1>Hello, { this.props.user.name }</h1>
          <div className="dashboard-welcome--buttons">
            <FlatButton 
            onClick={ () => this.props.history.push('/polls') }
            backgroundColor={ lightBlueA400 }
            labelStyle={{ color: 'white'}} 
            label="View all Polls"
            />
            <FlatButton 
            backgroundColor={ redA400 }
            labelStyle={{ color: 'white'}} 
            label="Add a new Poll" 
            onClick={ () => this.props.history.push('/addpoll') }
            />
          </div>
        </div>
        <Paper className="poll-area">
        <h2>Your polls</h2>
          {
            this.state.polls &&

            this.state.polls.map((poll, i) => (
            <PollCard 
            key={ i }
            author={ poll.author }
            appUser={ this.props.user._id }
            history={ this.props.history }
            pollID={ poll._id }
            name={ poll.authorName } 
            stem={ poll.stem }
            deletePoll={ this.deletePoll.bind(this) }
            index={ i }
            />
          ))
          }
        </Paper>
      </div>
    )
  }
}