import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/users/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the user!", error);
            });
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/users/${id}`, user)
            .then(response => {
                alert('User updated successfully!');
                navigate('/users');
            })
            .catch(error => {
                console.error("There was an error updating the user!", error);
            });
    };

    return (
        <div>
            <h2>Edit User</h2>
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
                <button type="submit">Update User</button>
            </form>
            <Link to="/users">
                <button>Back to User List</button>
            </Link>
        </div>
    );
};

export default EditUser;