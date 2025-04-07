import React, { useState } from "react";
import axios from "axios";

const UploadMedia = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState(""); 

  const CLOUD_NAME = "dxhaawto2"; 
  const UPLOAD_PRESET = "mbvzl2fa"; 

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const fileType = selectedFile.type;
    const fileSize = selectedFile.size; 

    if (fileType.startsWith('image/') && fileSize > (2 * 1024 * 1024)) { 
      alert('Image must be less than 2MB');
      return;
    }

    if (fileType.startsWith('video/') && fileSize > (10 * 1024 * 1024)) { 
      alert('Video must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError(""); 
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected!");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Uploaded to Cloudinary:", response.data.secure_url);
      setUploadedUrl(response.data.secure_url);

      setError("");
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error.response?.data?.error?.message || error.message);
      setError(error.response?.data?.error?.message || "Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2>Upload Image or Video</h2>

      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
      />

      {preview && (
        <div className="mt-3">
          <h4>Preview:</h4>
          {file?.type.startsWith("image/") ? (
            <img
              src={preview}
              alt="preview"
              style={{ width: "300px", height: "auto", borderRadius: "8px" }}
            />
          ) : (
            <video
              src={preview}
              controls
              width="300"
              style={{ borderRadius: "8px" }}
            />
          )}
        </div>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {uploadedUrl && (
        <div className="mt-4">
          <h4>Uploaded Successfully!</h4>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            View Uploaded Media
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadMedia;
