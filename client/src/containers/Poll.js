import React from 'react';

const request = require('superagent');
import Pie from './Pie';

import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export default class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      authorName: '',
      stem: '',
      pollOptions: [],
      voteID: [],
      pollVotes: []
    }
  }

  componentDidMount() {
    const pollID = this.props.match.params.id;

    request
      .get(`/api/polls/${pollID}`)
      .end((err, res) => {
        if (err) {
          // TODO: handle the error
        } else {
          let { data } = res.body;
          let { author, authorName, options, stem,  } = data;
          let pollOptions = options.map(x => x.option);
          let pollVotes = options.map(x => x.votes);
          let voteID = options.map(x => x._id);

          this.setState({
            author,
            authorName,
            stem,
            pollOptions,
            pollVotes,
            voteID
          })
        }
      })
  }

  render() {
    return (
      <Card>
        <CardHeader
        title={ this.state.authorName }
        subtitle="A PollAce User"
        avatar="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
        />
        <CardMedia>
          <Pie options={ this.state.pollOptions } votes={ this.state.pollVotes } />
        </CardMedia>
        <CardTitle title={ this.state.stem } />
        <CardText>
          <form>
            <RadioButtonGroup name="voteID">
              {
                this.state.pollOptions.map((x, i) => <RadioButton key={ i } value={ this.state.voteID[i] } label={ x } />)
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