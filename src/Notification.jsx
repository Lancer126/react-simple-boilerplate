import React, {Component} from 'react';

function Notification(props) {
  return (
  <div className="notification">
    <span className="notification-content">{props.message}</span>
  </div>
  );
}
export default Notification;