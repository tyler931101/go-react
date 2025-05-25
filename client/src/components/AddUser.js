import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/users', user)
            .then(response => {
                alert('User added successfully!');
                navigate('/users');
            })
            .catch(error => {
                console.error("There was an error adding the user!", error);
            });
    };

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={user.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={user.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add User</button>
            </form>
            <Link to="/users">
                <button>Back to User List</button>
            </Link>
        </div>
    );
};

export default AddUser;