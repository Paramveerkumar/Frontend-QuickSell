import React, { useState } from 'react';

const KanbanBoardColumnUsers = ({ initialTasks, users, ordering }) => {
    const [tasks, setTasks] = useState(initialTasks);

    const columns = users;

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('text/plain', taskId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, newStatus) => {
        const taskId = e.dataTransfer.getData('text');
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
    };

    const getAssigneeName = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name.split(' ')[0] : 'Unassigned';
    };

    // Sorting tasks based on the ordering prop (priority or title)
    const sortTasks = (tasks) => {
        if (ordering === 'priority') {
            return tasks.sort((a, b) => b.priority - a.priority); // Sort by priority descending
        } else if (ordering === 'title') {
            return tasks.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title
        }
        return tasks;
    };

    return (
        <div className="kanban-board">
            <div className="kanban-columns">
                {columns.map(column => (
                    <div
                        key={column.id}
                        className="kanban-column"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, column.id)}
                    >
                        <div className="kanban-column-header">
                            <h2>{column.name} <span className="task-count">{tasks.filter(task => task.userId === column.id).length}</span></h2>
                            <div className="kanban-column-header-btns">
                                <button className="add-task-btn"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.75 4C8.75 3.58579 8.41421 3.25 8 3.25C7.58579 3.25 7.25 3.58579 7.25 4V7.25H4C3.58579 7.25 3.25 7.58579 3.25 8C3.25 8.41421 3.58579 8.75 4 8.75H7.25V12C7.25 12.4142 7.58579 12.75 8 12.75C8.41421 12.75 8.75 12.4142 8.75 12V8.75H12C12.4142 8.75 12.75 8.41421 12.75 8C12.75 7.58579 12.4142 7.25 12 7.25H8.75V4Z" fill="#5C5C5E" />
                                </svg>
                                </button>
                                <button className="add-task-btn">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 6.5C3.39782 6.5 3.77936 6.65804 4.06066 6.93934C4.34196 7.22064 4.5 7.60218 4.5 8C4.5 8.39782 4.34196 8.77936 4.06066 9.06066C3.77936 9.34196 3.39782 9.5 3 9.5C2.60218 9.5 2.22064 9.34196 1.93934 9.06066C1.65804 8.77936 1.5 8.39782 1.5 8C1.5 7.60218 1.65804 7.22064 1.93934 6.93934C2.22064 6.65804 2.60218 6.5 3 6.5ZM8 6.5C8.39782 6.5 8.77936 6.65804 9.06066 6.93934C9.34196 7.22064 9.5 7.60218 9.5 8C9.5 8.39782 9.34196 8.77936 9.06066 9.06066C8.77936 9.34196 8.39782 9.5 8 9.5C7.60218 9.5 7.22064 9.34196 6.93934 9.06066C6.65804 8.77936 6.5 8.39782 6.5 8C6.5 7.60218 6.65804 7.22064 6.93934 6.93934C7.22064 6.65804 7.60218 6.5 8 6.5ZM13 6.5C13.3978 6.5 13.7794 6.65804 14.0607 6.93934C14.342 7.22064 14.5 7.60218 14.5 8C14.5 8.39782 14.342 8.77936 14.0607 9.06066C13.7794 9.34196 13.3978 9.5 13 9.5C12.6022 9.5 12.2206 9.34196 11.9393 9.06066C11.658 8.77936 11.5 8.39782 11.5 8C11.5 7.60218 11.658 7.22064 11.9393 6.93934C12.2206 6.65804 12.6022 6.5 13 6.5Z" fill="#5C5C5E" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {sortTasks(tasks.filter(task => task.userId === column.id))
                            .map(task => (
                                <div
                                    key={task.id}
                                    className="task-card"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task.id)}
                                >
                                    <div className="task-header">
                                        <span className="task-id">{task.id}</span>
                                        <span className="task-assignee">{getAssigneeName(task.userId).slice(0, 1)}</span>
                                    </div>
                                    <p className="task-title">{task.title}</p>
                                    <div className="task-footer">
                                        <span className="task-tag">Feature Request</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoardColumnUsers;