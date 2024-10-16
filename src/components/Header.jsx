import React from 'react';

const Header = ({ setGrouping, setSorting }) => {
  return (
    <div className="header">
      <div className="display-section">
        <button>Display</button>
        <div className="dropdowns">
          <label>Grouping:</label>
          <select onChange={(e) => setGrouping(e.target.value)}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
          <label>Ordering:</label>
          <select onChange={(e) => setSorting(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
