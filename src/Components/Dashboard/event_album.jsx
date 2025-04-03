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

const EventAlbum = () => {
  const navigate=useNavigate()
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
  const handleAlbumCategory=(event)=>{
    const albumCategories=[
      "Wedding","Birthday","Festival","Anniversary",
      "Conference","Concert","Trip","Graduation","Competition","Reunion","Others"]
    if(albumCategories.includes(event)){
      navigate(`/category-album?type=${event}`)
    }
    else{
      navigate(`/memory_vault`)
    }
  }
  return (
    <div className="w-full h-screen p-4 flex flex-col items-center justify-center bg-black text-white">
      <div className="back-arrow" onClick={() => navigate("/dashboard")}>
        ↩
      </div>
      <h2 className="text-xl font-bold text-center mb-8">Albums of Events</h2>
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
        {events.map((event, index) => (
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
            onClick={()=>handleAlbumCategory(event.name)}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div style={{ fontSize: "2em", marginBottom: "5px" }}>{event.icon}</div>
            <span>{event.name}</span>
            <span style={{ marginLeft: "10px", fontSize: "1.5em" }}>➕</span>
          </button>
        ))}
      </div>
    </div>
    
  );
};

export default EventAlbum;