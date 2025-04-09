import React from "react";
import {
  FaUserFriends,
  FaHeart,
  FaHome,
  FaChild,
  FaPaw,
  FaUser,
  FaBriefcase,
  FaSchool,
  FaUsers,
  FaPaintBrush,
  FaEllipsisH,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MemoryAlbum = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Friends", icon: <FaUserFriends /> },
    { name: "Couple", icon: <FaHeart /> },
    { name: "Family", icon: <FaHome /> },
    { name: "Child", icon: <FaChild /> },
    { name: "Pet", icon: <FaPaw /> },
    { name: "Individual", icon: <FaUser /> },
    { name: "Work", icon: <FaBriefcase /> },
    { name: "Class", icon: <FaSchool /> },
    { name: "Team", icon: <FaUsers /> },
    { name: "Hobby", icon: <FaPaintBrush /> },
    { name: "Others", icon: <FaEllipsisH /> },
  ];

  const handleCategoryAlbums = (category) => {
    navigate(`/category-album?type=${category}`);
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

      <h2 className="text-center mb-4">Album of Memories</h2>

      <div
        className="d-flex flex-wrap justify-content-center gap-3"
        style={{ maxWidth: "1000px" }}
      >
        {categories.map((category, index) => (
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
            onClick={() => handleCategoryAlbums(category.name)}
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
              {category.icon}
            </div>
            <div style={{ fontWeight: "bold" }}>{category.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryAlbum;
