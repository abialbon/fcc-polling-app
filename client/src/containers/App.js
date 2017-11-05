import React from 'react';

import request from 'superagent';

import Routes from '../components/Routes';
import Auth from '../modules/clientAuth';

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
      }
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
      console.log('Set App Message was run')
      this.setState({
        message: {
          color: message.color,
          text: message.text
        }
      });
    }
  }

  componentDidMount() {
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
      // TODO: handle this case !
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
      <Routes 
      appIP={ this.state.appIP }
      user={ this.state.user }
      authenticated={ this.state.authenticated }
      message={ this.state.message }
      setMessage={ this.setAppMessage.bind(this) }
      userAuthenticate={ this.userAuthenticate.bind(this) }
      logout={ this.logout.bind(this) }
      />
    )
  }
}

export default App;