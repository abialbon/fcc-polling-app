import React from 'react';

import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';

export default function PollCard (props) {
  return (
  <Card>
    <CardHeader
    title="User" 
    subtitle="A PollAce User"
    avatar="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
    />
    <CardMedia>
      
    </CardMedia>
    <CardTitle title="Who is the best person in the world?" />
    <CardActions>
      <FlatButton label="Vote"/>
      <FlatButton label="Delete"/>
    </CardActions>
  </Card>
  )
}