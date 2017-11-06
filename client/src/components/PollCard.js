import React from 'react';

import { Card, CardHeader, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import { lightBlueA400, redA400 } from 'material-ui/styles/colors';

export default function PollCard ({ author, name, stem, appUser, pollID, history, deletePoll, index }) {
  return (
  <Card className="poll-card">
    <CardHeader
    title={ name }
    subtitle="A PollAce User"
    avatar="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
    />
    <CardTitle className="poll-title" title={ stem } />
    <CardActions>
      <FlatButton
      labelStyle={{ color: '#ffffff' }}
      backgroundColor={ lightBlueA400 }
      onClick={ () => history.push(`/poll/${pollID}`) } 
      label="Vote"
      />
      {
        appUser === author && 
        <FlatButton 
        labelStyle={{ color: '#ffffff' }}
        backgroundColor={ redA400 }
        onClick={ () => deletePoll(pollID, index) }
        label="Delete"
        />
      }
    </CardActions>
  </Card>
  )
}