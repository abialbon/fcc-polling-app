import React from 'react';

import { events } from './App';
import $ from 'jquery';

import Auth from '../modules/clientAuth';
import request from 'superagent';
import Pie from './Pie';

import '../styles/Poll.scss';
import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Snackbar from 'material-ui/Snackbar';
import FontIcon from 'material-ui/FontIcon';
import Share from 'material-ui/svg-icons/social/share';
import Plus from 'material-ui/svg-icons/content/add';
import { lightBlueA400, redA400, fullWhite, teal400 } from 'material-ui/styles/colors';

export default class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appUserID: this.props.user._id,
      appIP: this.props.appIP,
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
      voteEligibility: true,
      voteEligibilityMessage: '',
      dialogOpen: false,
      optionToAdd: '',
      snackbarOpen: false,
      snack: ''
    }
    this.checkVoteEligibility = (user, appIP) => {
      console.log(user, appIP);
      let eligibility;
      let eligibilityMessage = '';
      if (user._id && this.state.votedUsers.indexOf(user._id) !== -1) {
        eligibility = false;
        eligibilityMessage = 'You have already voted'
      } else if (appIP && this.state.votedIp.indexOf(appIP) !== -1) {
        eligibility = false;
        eligibilityMessage = 'This IP has already voted'
      } else {
        eligibility = true;
      }
      this.setState({
        voteEligibility: eligibility,
        voteEligibilityMessage: eligibilityMessage
      });
    }

    this.grabPoll = () => {
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
                this.checkVoteEligibility(this.props.user, this.props.appIP);
              }
            })
    }

    this.onChange = (e) => {
      this.state.voteSelection = e.target.value;
      this.checkVoteEligibility(this.props.user, this.props.appIP);
    }

    this.onVote =() => {
      if (this.state.voteSelection === '') {
        this.setState({
          snackbarOpen: true,
          snack: 'Please choose an option to vote'
        });
        return;
      }
      let voteIndex = this.state.voteID.indexOf(this.state.voteSelection);
      let tempVotes = this.state.pollVotes;
      let voteIncrement = tempVotes[voteIndex] + 1;
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

    // On Change event for the Dialog Input
    this.onDialogInput = (e) => {
      this.state.optionToAdd = e.target.value;
    }

    // On adding new option
    this.onAddNewOption = () => {
      if (this.state.optionToAdd === '') {
        return;
      } else {
        let pollID = this.state.pollID;
        let token = Auth.getToken();
        request
          .put(`/api/polls/${pollID}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ option: this.state.optionToAdd })
          .end((err, res) => {
            if (err) {
              this.setState({
                snackbarOpen: true,
                snack: 'Sorry something went wrong'
              })
            }
            if (res.body.success === true) {
              this.grabPoll();
              this.dialogClose();
              this.setState({
                snackbarOpen: true,
                snack: 'Option Added'
              })
              return;
            } else {
              this.setState({
                snackbarOpen: true,
                snack: 'You do not have the permission to do this'
              })
            }
          })
      }
    }
  }

  dialogOpen = () => {
    this.setState({
      dialogOpen: true
    })
  }

  dialogClose = () => {
    this.setState({
      dialogOpen: false
    })
  }

  snackOpen = () => {
    this.setState({
      snackbarOpen: true
    })
  }

  snackClose = () => {
    this.setState({
      snackbarOpen: false
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('update ran');
    this.setState({
      appUserID: nextProps.user._id,
      appIP: nextProps.appIP
    })
    this.checkVoteEligibility(nextProps.user, nextProps.appIP);
  }

  componentDidMount() {
    this.grabPoll();
  }

  render() {
    console.log('render ran');
    const actions = [
      <FlatButton
        label="Cancel"
        backgroundColor={ redA400 }
        labelStyle={ { color: '#ffffff'} }
        onClick={ this.dialogClose }
      />,
      <FlatButton
        label="Submit"
        backgroundColor={ teal400 }
        labelStyle={ { color: '#ffffff'} }
        onClick={ this.onAddNewOption  }
      />
    ]
    return (
      <div className="poll-container">
      <Snackbar 
        open={ this.state.snackbarOpen }
        message={ this.state.snack }
        autoHideDuration={ 4000 }
        onRequestClose={ this.snackClose }
      />
      <Dialog
        title="Add a new polling option"
        modal={ true }
        open={ this.state.dialogOpen }
        actions={ actions }
      >
      <TextField 
        floatingLabelText="Option to add"
        onChange={ this.onDialogInput.bind(this) }
      />
      </Dialog>
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
              <span>{ this.state.voteEligibilityMessage }</span>
            }
            
          </form>
        </CardText>
        <CardActions>
          {
            this.props.user._id === this.state.author &&
            <FlatButton
              label="Add An Option"
              labelPosition="after"
              labelStyle={{ color: '#ffffff' }}
              backgroundColor={ lightBlueA400 }
              icon={ <Plus color={fullWhite} /> }
              onClick={ this.dialogOpen }
          />
          }

          <FlatButton
            label="Tweet"
            labelPosition="before"
            labelStyle={{ color: '#ffffff' }}
            backgroundColor={ lightBlueA400 }
            icon={ <FontIcon className="fa fa-twitter" /> }
            href={ `https://twitter.com/intent/tweet?url=${window.location}&hashtags=PollAce` }
          />
        </CardActions>
      </Card>
      </div>
    )
  }
}