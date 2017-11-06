import React from 'react';
import Pie from './Pie';
import Auth from '../modules/clientAuth';

import '../styles/Landing.scss';
import FlatButton from 'material-ui/FlatButton';
import { lightBlueA400, redA400 } from 'material-ui/styles/colors';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['A', 'B', 'C'],
      numbers: [10, 4, 6],
      timer: 0
    }
  }

  componentDidMount() {
    function randomNumArray() {
      let a = [];
      for (let i = 0; i < 3; i++) {
        let r = Math.ceil(Math.random() * 20);
        a.push(r);
      }
      return a;
    }

    this.state.timer = setInterval(() => this.setState({
      numbers: randomNumArray()
    }), 2000)
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    return (
      <div className="landing">
        <div className="landing-container">
          <h1>Ask your next big question!</h1>
          <div className="landing-chart">
            <Pie options={ this.state.options } votes={ this.state.numbers } /> 
          </div>
          <div className="landing-buttons">
            {
              !this.props.authenticated && 
              <FlatButton 
              label="GET STARTED"
              labelStyle={{ color: '#ffffff' }}
              backgroundColor={ lightBlueA400 }
              onClick={ () => this.props.history.push('/signup') }
              />
            }
            {
              this.props.authenticated && 
              <FlatButton 
              label="ADD A POLL"
              labelStyle={{ color: '#ffffff' }}
              backgroundColor={ lightBlueA400 }
              onClick={ () => this.props.history.push('/addpoll') }
              />
            }
            <FlatButton 
            label="VIEW POLLS"
            labelStyle={{ color: '#ffffff' }}
            backgroundColor={ redA400 }
            onClick={ () => this.props.history.push('/polls') }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage;