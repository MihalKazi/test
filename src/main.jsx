import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import TodoList from './TodoList';
import Profile from './Profile';
import Stopwatch from './Stopwatch';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todo">To-Do List</Link>
            </li>
            <li>
              <Link to="/stopwatch">Stopwatch</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="/todo" element={user ? <TodoList /> : <Navigate to="/login" />} />
          <Route path="/stopwatch" element={user ? <Stopwatch /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/" element={<Home user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home({ user }) {
  return (
    <div>
      <h1>Welcome to the App</h1>
      {user ? (
        <p>You are logged in as {user.username}</p>
      ) : (
        <p>Please <Link to="/login">login</Link> to access the features.</p>
      )}
    </div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
  } else {
    console.error('Root element not found');
  }
});