import React from 'react';

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
            name={ poll.author } 
            stem={ poll.stem }
            context="allpolls"
            />
          ))
          }
        </Paper>
      </div>
    )
  }
}