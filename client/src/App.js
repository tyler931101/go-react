import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';

const App = () => {
  return (
    <Router>
      <div>
        <h1>React Go CRUD</h1>
        <Routes>
          {/* DashBoard Route */}
          <Route path="/" element={<DashBoard />} />

          {/* User Routes */}
          <Route path="/users" element={<UserList />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;