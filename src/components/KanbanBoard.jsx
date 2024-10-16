import React, { useEffect, useState } from 'react';
import KanbanColoumnStatus from './kanban/KanbanColoumnStatus';
import KanbanBoardColumnUsers from './kanban/KanbanColoumnUsers';
import KanbanColoumnUngency from './kanban/KanbanColoumnUngency';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default grouping by status
  const [ordering, setOrdering] = useState('priority'); // Default ordering by priority

  const [displayOpen, setDisplayOpen] = useState(false);

  // Function to save data to local storage
  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Function to load data from local storage
  const loadFromLocalStorage = (key) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      // Check if tickets are already in localStorage
      const savedTickets = loadFromLocalStorage('tickets');
      const savedUsers = loadFromLocalStorage('users');

      if (savedTickets && savedUsers) {
        setTickets(savedTickets);
        setUsers(savedUsers);
      } else {
        // Fetch data from API if not in local storage
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);

        // Save fetched data to local storage
        saveToLocalStorage('tickets', data.tickets);
        saveToLocalStorage('users', data.users);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(tickets, users);

  }, [tickets, users])

  // Group tickets by status
  const groupTicketsByStatus = (tickets) => {
    const grouped = {};
    tickets.forEach(ticket => {
      if (!grouped[ticket.status]) {
        grouped[ticket.status] = [];
      }
      grouped[ticket.status].push(ticket);
    });
    return grouped;
  };

  // Group tickets by userId
  const groupTicketsByUser = (tickets, users) => {
    const grouped = {};
    tickets.forEach(ticket => {
      if (!grouped[ticket.userId]) {
        grouped[ticket.userId] = [];
      }
      grouped[ticket.userId].push(ticket);
    });
    return grouped;
  };

  // Group tickets by priority
  const groupTicketsByPriority = (tickets) => {
    const grouped = { 4: [], 3: [], 2: [], 1: [], 0: [] }; // Initialize groups for each priority level
    tickets.forEach(ticket => {
      grouped[ticket.priority].push(ticket);
    });
    return grouped;
  };

  // Order tickets by priority or title
  const orderTickets = (tickets, ordering) => {
    if (ordering === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority); // Sort by descending priority
    } else {
      return tickets.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title alphabetically
    }
  };

  // Group and order tickets based on the current state
  let groupedTickets;
  if (grouping === 'status') {
    groupedTickets = groupTicketsByStatus(tickets);
  } else if (grouping === 'user') {
    groupedTickets = groupTicketsByUser(tickets, users);
  } else if (grouping === 'priority') {
    groupedTickets = groupTicketsByPriority(tickets);
  }

  // Render grouped tickets
  return (
    <div>
      <header className="board-header">
        <button className='' onClick={() => setDisplayOpen(!displayOpen)}>
          <div className="header-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.5 10.5C9.63261 10.5 9.75979 10.5527 9.85355 10.6464C9.94732 10.7402 10 10.8674 10 11V14C10 14.1326 9.94732 14.2598 9.85355 14.3536C9.75979 14.4473 9.63261 14.5 9.5 14.5H8.5C8.36739 14.5 8.24021 14.4473 8.14645 14.3536C8.05268 14.2598 8 14.1326 8 14V11C8 10.8674 8.05268 10.7402 8.14645 10.6464C8.24021 10.5527 8.36739 10.5 8.5 10.5H9.5ZM7 11.5V13H1.75C1.55109 13 1.36032 12.921 1.21967 12.7803C1.07902 12.6397 1 12.4489 1 12.25C1 12.0511 1.07902 11.8603 1.21967 11.7197C1.36032 11.579 1.55109 11.5 1.75 11.5H7ZM14.25 11.5C14.4489 11.5 14.6397 11.579 14.7803 11.7197C14.921 11.8603 15 12.0511 15 12.25C15 12.4489 14.921 12.6397 14.7803 12.7803C14.6397 12.921 14.4489 13 14.25 13H11V11.5H14.25ZM5.5 6C5.63261 6 5.75979 6.05268 5.85355 6.14645C5.94732 6.24021 6 6.36739 6 6.5V9.5C6 9.63261 5.94732 9.75979 5.85355 9.85355C5.75979 9.94732 5.63261 10 5.5 10H4.5C4.36739 10 4.24021 9.94732 4.14645 9.85355C4.05268 9.75979 4 9.63261 4 9.5V6.5C4 6.36739 4.05268 6.24021 4.14645 6.14645C4.24021 6.05268 4.36739 6 4.5 6H5.5ZM3 7.25V8.75H1.75C1.55109 8.75 1.36032 8.67098 1.21967 8.53033C1.07902 8.38968 1 8.19891 1 8C1 7.80109 1.07902 7.61032 1.21967 7.46967C1.36032 7.32902 1.55109 7.25 1.75 7.25H3ZM14.25 7.25C14.4489 7.25 14.6397 7.32902 14.7803 7.46967C14.921 7.61032 15 7.80109 15 8C15 8.19891 14.921 8.38968 14.7803 8.53033C14.6397 8.67098 14.4489 8.75 14.25 8.75H7V7.25H14.25ZM11.5 1.75C11.6326 1.75 11.7598 1.80268 11.8536 1.89645C11.9473 1.99021 12 2.11739 12 2.25V5.25C12 5.38261 11.9473 5.50979 11.8536 5.60355C11.7598 5.69732 11.6326 5.75 11.5 5.75H10.5C10.3674 5.75 10.2402 5.69732 10.1464 5.60355C10.0527 5.50979 10 5.38261 10 5.25V2.25C10 2.11739 10.0527 1.99021 10.1464 1.89645C10.2402 1.80268 10.3674 1.75 10.5 1.75H11.5ZM9 3V4.5H1.75C1.55109 4.5 1.36032 4.42098 1.21967 4.28033C1.07902 4.13968 1 3.94891 1 3.75C1 3.55109 1.07902 3.36032 1.21967 3.21967C1.36032 3.07902 1.55109 3 1.75 3H9ZM14.25 3C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75C15 3.94891 14.921 4.13968 14.7803 4.28033C14.6397 4.42098 14.4489 4.5 14.25 4.5H13V3H14.25Z" fill="#5C5C5E" />
            </svg>
            Display
          </div>
        </button>
        {
          displayOpen && <div className="display-options">
            <div className="">
              <label>Grouping:</label>
              <select value={grouping} onChange={e => {
                setGrouping(e.target.value)
                setDisplayOpen(!displayOpen)
              }}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="">
              <label>Ordering:</label>
              <select value={ordering} onChange={e => {
                setOrdering(e.target.value)
                setDisplayOpen(!displayOpen)
              }}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        }
      </header>

      {
        tickets.length > 0 && users.length > 0 && <div>
          {grouping === 'status' && <KanbanColoumnStatus initialTasks={tickets} users={users} ordering={ordering} />}

          {grouping === 'user' && <KanbanBoardColumnUsers initialTasks={tickets} users={users} ordering={ordering} />}

          {grouping === 'priority' && <KanbanColoumnUngency initialTasks={tickets} users={users} ordering={ordering} />}
        </div>
      }
    </div>
  );
};

export default KanbanBoard;