const events = {};
import React from 'react';

import $ from 'jquery';
import request from 'superagent';

import Routes from '../components/Routes';
import Auth from '../modules/clientAuth';
import SnackBar from 'material-ui/Snackbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      authenticated: false,
      appIP: '',
      message: {
        color: '',
        text: ''
      },
      snackbarOpen: false,
      snackbarMessage: ''
    }

    // Authenticate the user
    this.userAuthenticate = (user) => {
      this.setState({
        authenticated: true,
        user: user
      });
    }

    this.logout = () => {
      this.setState({
        authenticated: false,
        user: {}
      });
      Auth.logout();
    }

    // Set the App's message
    this.setAppMessage = (message) => {
      this.setState({
        message: {
          color: message.color,
          text: message.text
        }
      });
    }
  }

  snackbarOpen = () => {
    this.setState({
      snackbarOpen: true
    });
  }

  snackbarClose = () => {
    this.setState({
      snackbarOpen: false,
      snackbarMessage: ''
    });
  }

  componentDidMount() {
    $(events).on('snack', (e, message) => {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: message
      });
    })
    if (Auth.isAuthenticated()) {
      const token = Auth.getToken();
      request
        .get('/api/validate')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if(err) {
            localStorage.setItem('app_token', 'null');
          }
          if (!err) {
            this.setState({
              authenticated: true,
              user: {
                _id: res.body.user._id,
                name: res.body.user.name
              }
            })
          }
        })
    } else {
      request
        .get('/api/getIP')
        .end((err, res) => {
          this.setState({
            appIP: res.body.ip
          })
        })
    }
  }

  render() {
    return (
      <div>
        <Routes 
          appIP={ this.state.appIP }
          user={ this.state.user }
          authenticated={ this.state.authenticated }
          message={ this.state.message }
          setMessage={ this.setAppMessage.bind(this) }
          userAuthenticate={ this.userAuthenticate.bind(this) }
          logout={ this.logout.bind(this) }
        />
        <SnackBar 
          open={ this.state.snackbarOpen }
          message={ this.state.snackbarMessage }
          autoHideDuration={4000}
          onRequestClose={ this.snackbarClose }
        />
      </div>
    )
  }
}

export default App;
export { events };