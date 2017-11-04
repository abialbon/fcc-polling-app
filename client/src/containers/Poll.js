import React from 'react';

import Pie from './Pie';

import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export default class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stem: '',
      options: [],
      voteID: [],
      votes: []
    }
  }

  componentDidMount() {
    console.log('The poll component mounted!')
    fetch('/data/post.json')
      .then(res => res.json())
      .then(r => {
        let stem = r.data.stem;
        let options = r.data.options.map(x => x.option);
        let voteID = r.data.options.map(x => x._id);
        let votes = r.data.options.map(x => x.votes);
        this.setState({
          stem,
          options,
          voteID,
          votes
        })
      })
      .catch(err => console.log(err.message))
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
          <Pie options={ this.state.options } votes={ this.state.votes } />
        </CardMedia>
        <CardTitle title={ this.state.stem } />
        <CardText>
          <form>
            <RadioButtonGroup name="voteID">
              {
                this.state.options.map((x, i) => <RadioButton key={ i } value={ this.state.voteID[i] } label={ x } />)
              }
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