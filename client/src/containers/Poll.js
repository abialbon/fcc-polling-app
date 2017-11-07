import React from 'react';

import { events } from './App';
import $ from 'jquery';

import Auth from '../modules/clientAuth';
import request from 'superagent';
import Pie from './Pie';

import '../styles/Poll.scss';
import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Share from 'material-ui/svg-icons/social/share';
import { lightBlueA400, redA400, fullWhite } from 'material-ui/styles/colors';

export default class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollID: '',
      author: '',
      authorName: '',
      stem: '',
      pollOptions: [],
      voteID: [],
      pollVotes: [],
      votedUsers: [],
      votedIp: [],
      voteSelection: '',
      voteEligibility: true
    }
    this.checkVoteEligibility = () => {
      let eligibility;
      if (this.props.user._id && this.state.votedUsers.indexOf(this.props.user._id) === -1) {
        eligibility = true;
      } else if (this.props.appIP && this.state.votedIp.indexOf(this.props.appIP) === -1) {
        eligibility = true;
      } else {
        eligibility = false;
      }
      this.setState({
        voteEligibility: eligibility
      });
    }

    this.onChange = (e) => {
      this.state.voteSelection = e.target.value;
      this.checkVoteEligibility();
    }

    this.onVote =() => {
      let voteIndex = this.state.voteID.indexOf(this.state.voteSelection);
      let tempVotes = this.state.pollVotes;
      let voteIncrement = tempVotes[voteIndex] + 1;
      console.log(tempVotes, voteIncrement);
      const token = Auth.getToken();

      const voterequest = request
        .post(`/api/polls/${this.state.pollID}`)
        
      if (token !== 'null') {
        voterequest
          .set('Authorization', `Bearer ${token}`)
      }

      voterequest
        .send({ voteID: this.state.voteSelection })
        .end((err, res) => {
          if (err) {
            $(events).trigger('snack', ['Some problem occured!'])
          } else {
            $(events).trigger('snack', ['Vote registered !'])
            tempVotes[voteIndex] = voteIncrement;
            this.setState({
              pollVotes: tempVotes,
              voteEligibility: false
            })
          }
        })
    }
  }

  componentDidMount() {
    const pollID = this.props.match.params.id;

    request
      .get(`/api/polls/${pollID}`)
      .end((err, res) => {
        if (err) {
          $(events).trigger('snack', ['Error: Please refresh the page'])
        } else {
          let { data } = res.body;
          let { _id, author, authorName, options, stem, votedUsers, votedIp  } = data;
          let pollOptions = options.map(x => x.option);
          let pollVotes = options.map(x => x.votes);
          let voteID = options.map(x => x._id);
          this.setState({
            pollID: _id,
            author,
            authorName,
            stem,
            pollOptions,
            pollVotes,
            voteID,
            votedUsers,
            votedIp
          })
          this.checkVoteEligibility();
        }
      })
  }

  render() {
    return (
      <div className="poll-container">
      <Card>
        <CardHeader
        title={ this.state.authorName }
        subtitle="A PollAce User"
        avatar="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
        />
        <CardMedia>
          <Pie label={ true } options={ this.state.pollOptions } votes={ this.state.pollVotes } />
        </CardMedia>
        <CardTitle title={ this.state.stem } />
        <CardText>
          <form>
            <RadioButtonGroup onChange={ this.onChange } name="voteID">
              {
                this.state.pollOptions.map((x, i) => <RadioButton key={ i } value={ this.state.voteID[i] } label={ x } />)
              }
            </RadioButtonGroup>
            <FlatButton 
            className="poll-vote" 
            label="Vote"
            disabled={ !this.state.voteEligibility }
            backgroundColor={ lightBlueA400 }
            onClick={ this.onVote }
            />
            {
              !this.state.voteEligibility &&
              <span> You have voted already </span>
            }
            
          </form>
        </CardText>
        <CardActions>
          <FlatButton
            label="Tweet"
            labelPosition="before"
            labelStyle={{ color: '#ffffff' }}
            backgroundColor={ lightBlueA400 }
            icon={ <Share color={fullWhite} /> }
            href={ `https://twitter.com/intent/tweet?url=${window.location}&hashtags=PollAce` }
          />
        </CardActions>
      </Card>
      </div>
    )
  }
}