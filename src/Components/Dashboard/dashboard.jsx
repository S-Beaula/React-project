import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [visibleInfo, setVisibleInfo] = useState(false);

  const handleSelection = (option) => {
    if (option === "memory_album") {
      navigate("/memory-album");
    } else if (option === "event_album") {
      navigate("/event-album");
    } else {
      console.log(`Selected: ${option}`);
    }
  };

  const infoToggle = () => {
    setVisibleInfo((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
     
      <h1 className="dashboard-title">What type of album do you want to create?</h1>
      <p className="toggleinfo" onClick={infoToggle}>
        Which album suits you? ➕
      </p>

      {visibleInfo && (
        <div className="panelinfo">
          <h3>Which album suits you?</h3>
          <p>
            Choose a <code>Memory Album</code> for personal collections like family or pets.<br />
            Select an <code>Event Album</code> for gatherings like weddings or birthdays.<br />
            You can also <code>Join existing albums</code> shared by others!
          </p>
        </div>
      )}

      <div className="album-options">
        <button
          className="album-button memory-album"
          onClick={() => handleSelection("memory_album")}
        >
          <span className="icon">📷</span>
          <div>
            <p className="album-title">Create Memory Album</p>
            <p className="album-description">Partner, family, friends, pet, son/daughter...</p>
          </div>
        </button>

        <button
          className="album-button event-album"
          onClick={() => handleSelection("event_album")}
        >
          <span className="icon">🎉</span>
          <div>
            <p className="album-title">Create Event Album</p>
            <p className="description">Weddings, birthdays, celebrations...</p>
          </div>
        </button>

        <button
          className="album-button join-album"
          onClick={() => handleSelection("join_album")}
        >
          <span className="album-icon">🔗</span>
          <div>
            <p className="album-title">I want to join an album</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;