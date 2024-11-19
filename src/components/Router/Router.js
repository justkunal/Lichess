import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LichessProfile from "../LichessProfile/index";
import Leaderboard from "../LichessLeaderBoard/index";

const AppRouter = () => {
  return (
    <Router>
      <nav style={{ padding: "20px", background: "#f5f5f5", marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "20px", textDecoration: "none", fontWeight: "bold" }}>
          Profile Viewer
        </Link>
        <Link to="/leaderboard" style={{ textDecoration: "none", fontWeight: "bold" }}>
          Leaderboard
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<LichessProfile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
