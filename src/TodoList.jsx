import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { PieChart, Pie, Cell } from 'recharts';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('creationTime');

  useEffect(() => {
    fetch('http://3.109.211.104:8001/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sort === 'creationTime') return new Date(a.created_at) - new Date(b.created_at);
    if (sort === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
    if (sort === 'priority') return a.priority - b.priority;
  });

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const efficiency = (completedTodos / totalTodos) * 100;

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <div className="filters">
        <label>
          Filter:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </label>
        <label>
          Sort by:
          <select value={sort} onChange={handleSortChange}>
            <option value="creationTime">Creation Time</option>
            <option value="deadline">Deadline</option>
            <option value="priority">Priority</option>
          </select>
        </label>
      </div>
      <ul>
        {sortedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={(id, updatedTodo) => {
            setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
          }} />
        ))}
      </ul>
      <div className="statistics">
        <h3>Statistics</h3>
        <p>Total Tasks: {totalTodos}</p>
        <p>Completed Tasks: {completedTodos}</p>
        <p>Efficiency: {efficiency.toFixed(2)}%</p>
        <PieChart width={200} height={200}>
          <Pie
            data={[
              { name: 'Completed', value: completedTodos },
              { name: 'Pending', value: totalTodos - completedTodos },
            ]}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            <Cell fill="#6295ff" />
            <Cell fill="#ff7373" />
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}

export default TodoList;