import React, { useState } from 'react';
import '../App.css'; 

function DisplayDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [grouping, setGrouping] = useState('Status');
  const [ordering, setOrdering] = useState('Priority');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="display-dropdown">
      <button className="display-button" onClick={toggleDropdown}>
        <i className='./icons/Display' /> Display 
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <label htmlFor="grouping">Grouping</label>
            <select
              id="grouping"
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
            >
              <option value="Status">Status</option>
              <option value="Priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-item">
            <label htmlFor="ordering">Ordering</label>
            <select
              id="ordering"
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
            >
              <option value="Priority">Priority</option>
              <option value="Date">Date</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayDropdown;
