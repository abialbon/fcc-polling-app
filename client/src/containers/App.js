import React from 'react';

import Routes from '../components/Routes';
import Auth from '../modules/clientAuth';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      authenticated: false,
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

  render() {
    return (
      <Routes 
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