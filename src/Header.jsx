import React, {Component} from 'react';

function Header(props) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <h4>{props.users}{props.users > 1 ? " users online" : " user online" } </h4>
    </nav>
  )
}
export default Header;