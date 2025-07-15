import React, { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://assignment12-bde3gjfgcvc2a8a8.centralindia-01.azurewebsites.net/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://assignment12-bde3gjfgcvc2a8a8.centralindia-01.azurewebsites.net/api/users", {
        name: newUserName,
      });
      setUsers([...users, response.data]);
      setNewUserName("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="user-management">
      <h2>Manage Users</h2>

      <form onSubmit={handleAddUser} className="add-user-form">
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter user name"
          required
        />
        <button type="submit">Add User</button>
      </form>

      <div className="user-list">
        <h3>Existing Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
