import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [category, setCategory] = useState("blitz"); // Default category
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = ["bullet", "blitz", "rapid", "classical", "correspondence"];

  useEffect(() => {
    fetchLeaderboard();
  }, [category]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`https://lichess.org/api/leaderboard/${category}?nb=10`);
      setLeaderboardData(response.data.users);
    } catch (err) {
      setError("Failed to load leaderboard data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Lichess Leaderboard</h1>
      <div>
        <label htmlFor="category" style={{ marginRight: "10px", fontSize: "16px" }}>
          Select Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && leaderboardData.length > 0 && (
        <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Rank</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Username</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Rating</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Games Played</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={user.id}>
                <td style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{user.id}</td>
                <td style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
                  {user.perfs[category]?.rating || "N/A"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
                  {user.perfs[category]?.games || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
