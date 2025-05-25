import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // Fixed number of users per page
    const [search, setSearch] = useState(""); // For search query
    const [loading, setLoading] = useState(false);

    // Fetch users whenever page or search changes
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true); // Show loading state
            try {
                const response = await axios.get('http://localhost:8080/users', {
                    params: {
                        page: page,
                        limit: limit,
                        search: search
                    }
                });
                setUsers(response.data.users); // Set users to state
                setTotalCount(response.data.total_count); // Set total count for pagination
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false); // Hide loading state
            }
        };fetchUsers();
    }, [page, search, limit]);

    // Function to fetch users from backend
    

    // Handle changes in search input
    const handleSearchChange = (e) => {
        setSearch(e.target.value);  // Set search term
        setPage(1);  // Reset to page 1 whenever search is updated
    };

    // Handle page changes
    const handlePageChange = (newPage) => {
        setPage(newPage); // Set new page for pagination
    };

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div>
            <h2>User List</h2>

            {/* Search Box */}
            <div>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Loading Spinner */}
            {loading && <p>Loading...</p>}

            {/* User Table */}
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div>
                <button onClick={() => handlePageChange(1)} disabled={page === 1}>First</button>
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
                <button onClick={() => handlePageChange(totalPages)} disabled={page === totalPages}>Last</button>
            </div>
            {/* Pagination Dropdown */}
            <div style={{ marginTop: '10px' }}>
                <label>Go to Page: </label>
                <select value={page} onChange={e => setPage(Number(e.target.value))}>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default UserList;