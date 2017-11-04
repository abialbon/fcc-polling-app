import React from 'react';

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
    fetch('/data/allposts.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          polls: data.data
        });
      })
      .catch(err => console.log(err.message))

  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-welcome">
          <h1>Hello, User</h1>
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
            />
          </div>
        </div>
        <Paper className="poll-area">
        <h2>Your polls</h2>
          {
            this.state.polls.map((poll, i) => (
            <PollCard 
            key={ i }
            name={ poll.author } 
            stem={ poll.stem }
            />
          ))
          }
        </Paper>
      </div>
    )
  }
}