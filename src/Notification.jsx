import React, {Component} from 'react';

function Notification(props) {
  return (
  <div className="message-system">
    <span>{props.message}</span>
  </div>
  );
}
export default Notification;