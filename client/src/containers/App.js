import React from 'react';

import Routes from '../components/Routes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      message: {
        color: '',
        text: ''
      }
    }
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
      authenticated={ this.state.authenticated }
      message={ this.state.message }
      setMessage={ this.setAppMessage.bind(this) }
      />
    )
  }
}

export default App;