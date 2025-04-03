import React from "react";
import UploadMedia from "../UploadMedia/upload_media";
import { useNavigate, useLocation } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";

const AlbumCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const category = params.get("type") || "General";

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-50 bg-dark text-white">
      <div className="card p-4 text-center shadow-lg bg-light mt-3" style={{ width: "400px" }}>
        <button onClick={() => navigate("/memory-album")} className="btn btn-outline-dark mb-3">
          ← Back to Memory Album
        </button>
        <h2 className="text-primary">{category} Album</h2>
        <p className="text-muted">Showing memories related to: {category}</p>
      </div>
      
    </div>
    <UploadMedia/>
    </div>
  );
};

export default AlbumCategory;

