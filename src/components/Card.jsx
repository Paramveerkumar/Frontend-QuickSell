import React from 'react';

const Card = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <h3>{ticket.title}</h3>
      <p>Priority: {ticket.priority}</p>
      <p>Status: {ticket.status}</p>
      <p>User: {ticket.userId}</p>
    </div>
  );
};

export default Card;
