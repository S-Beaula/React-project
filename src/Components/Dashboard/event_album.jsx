import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRing,
  FaBirthdayCake,
  FaFire,
  FaHeart,
  FaMicrophone,
  FaMusic,
  FaPlane,
  FaGraduationCap,
  FaTrophy,
  FaHandshake,
  FaEllipsisH,
} from "react-icons/fa";

const events = [
  { name: "Wedding", icon: <FaRing /> },
  { name: "Birthday", icon: <FaBirthdayCake /> },
  { name: "Festival", icon: <FaFire /> },
  { name: "Anniversary", icon: <FaHeart /> },
  { name: "Conference", icon: <FaMicrophone /> },
  { name: "Concert", icon: <FaMusic /> },
  { name: "Trip", icon: <FaPlane /> },
  { name: "Graduation", icon: <FaGraduationCap /> },
  { name: "Competition", icon: <FaTrophy /> },
  { name: "Reunion", icon: <FaHandshake /> },
  { name: "Others", icon: <FaEllipsisH /> },
];

const EventAlbum = () => {
  const navigate = useNavigate();

  const handleAlbumCategory = (eventName) => {
    navigate(`/category-album?type=${eventName}`);
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-start bg-dark min-vh-100 text-white py-4">
      <div className="w-100 d-flex justify-content-start ps-3 mb-3">
        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/dashboard")}
        >
          ↩ Back
        </button>
      </div>

      <h2 className="text-center mb-4">Albums of Events</h2>

      <div
        className="d-flex flex-wrap justify-content-center gap-3"
        style={{ maxWidth: "1000px" }}
      >
        {events.map((event, index) => (
          <button
            key={index}
            className="d-flex flex-column align-items-center justify-content-center p-3"
            style={{
              background: "linear-gradient(to right, #4A00E0, #8E2DE2)",
              color: "white",
              width: "150px",
              height: "150px",
              borderRadius: "15px",
              border: "none",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s ease",
            }}
            onClick={() => handleAlbumCategory(event.name)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
            }}
          >
            <div style={{ fontSize: "2em", marginBottom: "5px" }}>
              {event.icon}
            </div>
            <div style={{ fontWeight: "bold" }}>{event.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventAlbum;
