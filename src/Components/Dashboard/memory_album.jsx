import React, { Component } from "react";
import { FaUserFriends, FaHeart, FaHome, FaChild, FaPaw, FaUser, FaBriefcase, FaSchool, FaUsers, FaPaintBrush, FaEllipsisH } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FriendsPage from "./album_category";
const MemoryAlbum = () => {
  const navigate=useNavigate()
  const categories = [
        { name: "Friends", icon: <FaUserFriends />},
        { name: "Couple", icon: <FaHeart />,},
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
        const memoryCategories = [
          "Friends", "Couple", "Family", "Child", "Pet",
          "Individual", "Work", "Class", "Team", "Hobby", "Others"
        ];
      
        if (memoryCategories.includes(category)) {
          navigate(`/category-album?type=${category}`);
        } else {
          navigate("/memory_vault");
        }
      };
      
  return (
    <div className="w-full h-screen p-4 flex flex-col items-center justify-center bg-black text-white">
       <div className="back-arrow" onClick={() => navigate("/dashboard")}>
        ↩
      </div>
      <h2 className="text-xl font-bold text-center mb-8">Album of Memories</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          height:"50%",
          width: "20%", 
          alignContent: "center",
          margin: "0 auto",
          gap: "10px",
        }}
      >
        {categories.map((category, index) => (

          <button
            key={index}
            className="p-4"
            style={{
              background: "linear-gradient(to right, #4A00E0, #8E2DE2)", 
              color: "white",
              width: "100%", 
              height: "20vh", 
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onClick={() => handleCategoryAlbums(category.name)}

            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div style={{ fontSize: "2em", marginBottom: "5px" }}>{category.icon}</div>
            <span>{category.name}</span>
            <span style={{ marginLeft: "10px", fontSize: "1.5em" }}>➕</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryAlbum;

