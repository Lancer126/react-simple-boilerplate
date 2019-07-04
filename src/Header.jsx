import React, {Component} from 'react';

function Header(props) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <h4>{props.users} users online</h4>
    </nav>
  )
}
export default Header;