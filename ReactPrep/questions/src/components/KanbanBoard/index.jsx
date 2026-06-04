import React, { useState } from 'react';
import './styles.css';

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: [{ id: 1, text: 'Task 1' }, { id: 2, text: 'Task 2' }],
    inProgress: [{ id: 3, text: 'Task 3' }],
    done: [{ id: 4, text: 'Task 4' }],
  });

  const moveTask = (task, source, destination) => {
    setColumns(prev => {
      const sourceTasks = prev[source].filter(t => t.id !== task.id);
      const destinationTasks = [...prev[destination], task];
      return {
        ...prev,
        [source]: sourceTasks,
        [destination]: destinationTasks,
      };
    });
  };

  const handleDragStart = (e, task, source) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('task', JSON.stringify({ task, source }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, destination) => {
    e.preventDefault();
    try {
      const { task, source } = JSON.parse(e.dataTransfer.getData('task'));
      if (source !== destination) {
        moveTask(task, source, destination);
      }
    } catch (error) {
      console.error('Drop error:', error);
    }
  };

  const addTask = (column) => {
    const taskText = prompt('Enter task name:');
    if (taskText) {
      const newTask = { id: Date.now(), text: taskText };
      setColumns(prev => ({
        ...prev,
        [column]: [...prev[column], newTask],
      }));
    }
  };

  const deleteTask = (task, column) => {
    setColumns(prev => ({
      ...prev,
      [column]: prev[column].filter(t => t.id !== task.id),
    }));
  };

  return (
    <div className="kanban-board">
      {Object.keys(columns).map((column) => (
        <div key={column} className="kanban-column">
          <h2 className="column-title">{column.toUpperCase()}</h2>
          <div
            className="tasks-container"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column)}
          >
            {columns[column].map((task) => (
              <div
                key={task.id}
                className="task-card"
                draggable
                onDragStart={(e) => handleDragStart(e, task, column)}
              >
                <div className="task-content">{task.text}</div>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task, column)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            className="add-task-btn"
            onClick={() => addTask(column)}
          >
            + Add Task
          </button>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
