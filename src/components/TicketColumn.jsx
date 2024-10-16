import React from 'react';
import Card from './Card';

const TicketColumn = ({ group, tickets }) => {
  return (
    <div className="ticket-column">
      <h2>{group}</h2>
      {tickets.map((ticket) => (
        <Card key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketColumn;
