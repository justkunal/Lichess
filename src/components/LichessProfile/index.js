import React, { useState } from "react";
import axios from "axios";

const LichessProfile = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    try {
      setError(""); // Clear any previous errors
      const response = await axios.get(`https://lichess.org/api/user/${username}`);
      setUserData(response.data);
    } catch (err) {
      setError("User not found or an error occurred.");
      setUserData(null);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Lichess Profile Viewer</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Lichess username"
        style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
      />
      <button onClick={fetchUserData} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Fetch Profile
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {userData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Profile: {userData.id}</h2>
          {userData.profile && (
            <div>
              <p><strong>Bio:</strong> {userData.profile.bio || "No bio available"}</p>
              {userData.profile.country && (
                <p><strong>Country:</strong> {userData.profile.country.toUpperCase()}</p>
              )}
            </div>
          )}
          <p><strong>Games Played:</strong> {userData.count.all}</p>
          <h3>Ratings:</h3>
          <ul>
            {Object.entries(userData.perfs).map(([mode, details]) => (
              <li key={mode}>
                <strong>{mode.charAt(0).toUpperCase() + mode.slice(1)}:</strong> {details.rating}
              </li>
            ))}
          </ul>
          {userData.avatar ? (
            <img src={userData.avatar} alt="Profile avatar" style={{ width: "100px", borderRadius: "50%" }} />
          ) : (
            <p>No profile image available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LichessProfile;
