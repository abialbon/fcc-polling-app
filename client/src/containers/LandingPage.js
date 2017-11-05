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
      options: [undefined, 'B', 'C'],
      numbers: [10, 4, 6]
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="landing">
        <div className="landing-container">
          <h1>Ask your next big question!</h1>
          <div className="landing-chart">
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