import { useState, useEffect } from 'react';
//import Header from './components/Header';
import './App.css';
import KanbanBoard from './components/KanbanBoard';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  return (
    <div className="App">
      <KanbanBoard tickets={tickets} users={users} />
    </div>
  );
}

export default App;
