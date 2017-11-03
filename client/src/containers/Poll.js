import React from 'react';

import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export default class Poll extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
        <CardText>
          <form>
            <RadioButtonGroup name="voteID">
              <RadioButton value="option1" label="option1" />
              <RadioButton value="option2" label="option2" />
            </RadioButtonGroup>
            <FlatButton label="Vote"/>
          </form>
        </CardText>
        <CardActions>
          <FlatButton label="Delete"/>
        </CardActions>
      </Card>
    )
  }
}