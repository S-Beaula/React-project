import React, { useState } from "react";
import { storage, author } from "../../authconfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const UploadMedia = ({ category }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  const validTypes = ["image/jpeg", "image/png", "video/mp4", "video/mov"];

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!validTypes.includes(selectedFile.type)) {
      setError("Unsupported file type! Only JPG, PNG, MP4, and MOV are allowed.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.info("File is large, compressing...");
      try {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920 };
        const compressedFile = await imageCompression(selectedFile, options);
        setFile(compressedFile);
      } catch (error) {
        setError("Compression failed.");
        console.error(error);
      }
    } else {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected!");
      return;
    }

    setError("");
    const user = author.currentUser;
    if (!user) {
      setError("You need to be logged in to upload!");
      return;
    }

    const filePath = `albums/${category}/${user.uid}_${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setError("Upload failed!");
        console.error(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        toast.success("Upload successful!");
        console.log("File available at:", downloadURL);
      }
    );
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="w-50 text-center mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-outline-light">←</button>
          <h2>Upload Media</h2>
          <button className="btn btn-outline-light">Next</button>
        </div>

        <div className="bg-secondary rounded w-100 d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
          {file ? (
            <img src={URL.createObjectURL(file)} alt="Preview" className="w-100 h-70 rounded" />
          ) : (
            <label className="d-flex flex-column align-items-center cursor-pointer">
              <span className="text-light">📷</span>
              <span className="text-light">Cover Photo</span>
              <input type="file" className="d-none" onChange={handleFileChange} />
            </label>
          )}
        </div>

        {uploadProgress > 0 && (
          <div className="mt-2">
            <div className="progress">
              <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <p className="text-light mt-1">Upload Progress: {uploadProgress.toFixed(2)}%</p>
          </div>
        )}

        {error && <p className="text-danger mt-2">{error}</p>}

        <button onClick={handleUpload} className="btn btn-primary w-100 mt-4" disabled={!file}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadMedia;
