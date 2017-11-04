import React from 'react';

import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';

export default function PollCard ({ name, stem, context }) {
  return (
  <Card className="poll-card">
    <CardHeader
    title={ name }
    subtitle="A PollAce User"
    avatar="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
    />
    <CardMedia>
      
    </CardMedia>
    <CardTitle title={ stem } />
    <CardActions>
      <FlatButton label="Vote"/>
      {
        context !== "allpolls" && <FlatButton label="Delete"/>
      }
    </CardActions>
  </Card>
  )
}