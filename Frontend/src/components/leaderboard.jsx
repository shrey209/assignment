import React, { useState, useEffect } from "react";
import axios from "axios";
import "./leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(""); // Renamed for clarity

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("https://assignment12-bde3gjfgcvc2a8a8.centralindia-01.azurewebsites.net/api/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleClaimPoints = async () => {
    if (!selectedUserId) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/${selectedUserId}/claim`
      );
      // Refresh leaderboard after claiming points
      const updatedResponse = await axios.get(
        "http://localhost:5000/api/users"
      );
      setUsers(updatedResponse.data);
      alert(`Claimed ${response.data.points} points!`);
    } catch (error) {
      console.error("Error claiming points:", error);
      alert(
        `Error claiming points: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="header-section">
        <h1 className="title">Sellwood Line 14 Apr (165:4)</h1>
        <div className="controls">
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="user-select"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id || user.id} value={user._id || user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleClaimPoints}
            disabled={!selectedUserId}
            className="claim-button"
          >
            Claim Points
          </button>
        </div>
      </div>

      <div className="leaderboard-table">
        <div className="table-header">
          <div className="rank-col">Rank</div>
          <div className="name-col">Name</div>
          <div className="points-col">Points</div>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          users.map((user, index) => (
            <div
              key={user._id || user.id}
              className={`user-row ${index % 2 === 0 ? "even" : "odd"}`}
            >
              <div className="rank-col">{index + 1}</div>
              <div className="name-col">
                {user.name === "PRITESH" ? (
                  <strong>{user.name}</strong>
                ) : (
                  user.name
                )}
              </div>
              <div className="points-col">{user.totalPoints}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
