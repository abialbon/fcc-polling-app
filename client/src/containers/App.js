import React from 'react';

import Routes from '../components/Routes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  }

  render() {
    return (
      <Routes authenticated={ this.state.authenticated }/>
    )
  }
}

export default App;