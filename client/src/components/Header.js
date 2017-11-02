import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <p>This is the header component</p>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
      <Link to="/polls">Polls</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  )
}

export default Header;