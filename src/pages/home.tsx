import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove stored token/session
    localStorage.removeItem("AccessToken");
    navigate("/signin");
  };

  return (
    <div className="card">
      <div className="home-card">
        <h2>Welcome to the Auth Demo</h2>
        <p>You are signed in 🎉</p>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  );
};

export default Home;
