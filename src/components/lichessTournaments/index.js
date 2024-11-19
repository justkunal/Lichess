import React, { useState, useEffect } from "react";
import axios from "axios";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("https://lichess.org/api/tournament");
        setTournaments(response.data);
      } catch (err) {
        setError("Failed to load tournament data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Ongoing Tournaments</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && tournaments.length > 0 && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {tournaments.map((tournament) => (
            <li
              key={tournament.id}
              style={{
                border: "1px solid #ccc",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>{tournament.name}</h3>
              <p>
                <strong>Status:</strong> {tournament.status}
              </p>
              <p>
                <strong>Created By:</strong> {tournament.createdBy}
              </p>
              <p>
                <strong>Starts:</strong> {new Date(tournament.startsAt).toLocaleString()}
              </p>
              <a
                href={`https://lichess.org/tournament/${tournament.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue", textDecoration: "none" }}
              >
                View Tournament
              </a>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && tournaments.length === 0 && <p>No tournaments available.</p>}
    </div>
  );
};

export default Tournaments;
