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
  }

  componentDidMount() {
    const token = Auth.getToken();
    request
      .get(`api/polls/user/${this.props.user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        this.setState({
          polls: res.body.data
        })
      })
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
            this.state.polls.map((poll, i) => (
            <PollCard 
            key={ i }
            history={ this.props.history }
            pollID={ poll._id }
            name={ poll.authorName } 
            stem={ poll.stem }
            />
          ))
          }
        </Paper>
      </div>
    )
  }
}