import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to the User Management Dashboard!</p>
            <div>
                <Link to="/users">
                    <button>View All Users</button>
                </Link>
                <Link to="/add">
                    <button>Add New User</button>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;