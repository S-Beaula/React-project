import React, { useState } from "react";
import axios from "axios";
import { db } from "../../authconfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const UploadMedia = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Friends");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");
  console.log(uploadedUrl)
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const fileType = selectedFile.type;
    const fileSize = selectedFile.size;

    if (fileType.startsWith("image/") && fileSize > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    if (fileType.startsWith("video/") && fileSize > 10 * 1024 * 1024) {
      alert("Video must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError("");
  };

  const handleSaveToFirestore = async (uploadedUrl, description, selectedCategory) => {
    const uploadsCollection = collection(db, "uploads");

    await addDoc(uploadsCollection, {
      url: uploadedUrl,
      description,
      category: selectedCategory,
      createdAt: serverTimestamp(),
    });
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
      formData.append("upload_preset", uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedUrl = response.data.secure_url;
      setUploadedUrl(uploadedUrl);

      await handleSaveToFirestore(uploadedUrl, description, category);

      alert("Upload successful and saved!");

      setDescription("");
      setCategory("Friends");
      setFile(null);
      setPreview(null);

    } catch (error) {
      console.error("Upload failed:", error.response?.data?.error?.message || error.message);
      setError(error.response?.data?.error?.message || "Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark min-vh-100 container-fluid bg-dark py-5">
      <div className="card p-4 shadow-sm w-100 mb-5" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">Upload Media</h2>

        <div className="mb-3">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
          >
            <option value="Friends">Friends</option>
            <option value="Family">Family</option>
            <option value="Travel">Travel</option>
            <option value="Events">Events</option>
            <option value="Work">Work</option>
          </select>
        </div>

        {preview && (
          <div className="text-center mb-3">
            <h5 className="mb-2">Preview:</h5>
            {file?.type.startsWith("image/") ? (
              <img
                src={preview}
                alt="Preview"
                className="img-fluid rounded"
                style={{ maxHeight: "300px" }}
              />
            ) : (
              <video
                src={preview}
                controls
                className="img-fluid rounded"
                style={{ maxHeight: "300px" }}
              />
            )}
          </div>
        )}

        <button
          className="btn btn-primary w-100"
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
      </div>
    </div>
  );
};

export default UploadMedia;
