import React from 'react';
import { render } from 'react-dom';
import './styles/app.scss'

const Home = () => (
  <div className="header">
    <h1>Hello, React</h1>
  </div>
)

render(<Home/>, document.getElementById('app'))
