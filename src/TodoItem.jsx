import React, { useState, useEffect } from 'react';

function TodoItem({ todo, onUpdate }) {
  const [completed, setCompleted] = useState(todo.completed);
  const [remainingTime, setRemainingTime] = useState(todo.deadline - Date.now());

  useEffect(() => {
    if (completed !== todo.completed) {
      fetch(`http://3.109.211.104:8001/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...todo, completed }),
      }).then((response) => {
        if (response.ok) {
          onUpdate(todo.id, { ...todo, completed });
        }
      });
    }
  }, [completed, todo, onUpdate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => setCompleted(!completed)}
      />
      <span className={completed ? 'completed' : ''}>{todo.title}</span>
      <div className="countdown">{remainingTime > 0 ? formatTime(remainingTime) : 'Overdue'}</div>
    </div>
  );
}

export default TodoItem;