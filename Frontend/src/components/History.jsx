import React, { useState, useEffect } from "react";
import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL;

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get( url+"/api/history");
        setHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history:", error);
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>Claim History</h2>

      {loading ? (
        <p>Loading history...</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Points</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record) => (
              <tr key={record.id}>
                <td>{record.userId?.name || "Unknown"}</td>
                <td>{record.points}</td>
                <td>{new Date(record.claimedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
