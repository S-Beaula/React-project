import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar";
import Signup from "./Components/Authentication/Signup/signup";
import Login from "./Components/Authentication/Login/login";
import Dashboard from "./Components/Dashboard/dashboard";
import MemoryAlbum from "./Components/Dashboard/memory_album";
import EventAlbum from "./Components/Dashboard/event_album";
import AlbumCategory from "./Components/Dashboard/album_category";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { author } from "./authconfig";
import UploadMedia from "./Components/UploadMedia/upload_media";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(author, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(author).then(() => setUser(null));
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h2>Loading, please wait...</h2>
      </div>
    );
  }

  return (
    <div>
      {!user && (
        <Navbar
          handleShowSignup={() => setShowSignup(true)}
          handleShowLogin={() => setShowLogin(true)}
        />
      )}

      <Signup show={showSignup} handleClose={() => setShowSignup(false)} />
      <Login show={showLogin} handleClose={() => setShowLogin(false)} />

      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/signup" />} />

        {user ? (
          <>
            <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
            <Route path="/memory-album" element={<MemoryAlbum />} />
            <Route path="/event-album" element={<EventAlbum />} />
            <Route path="/category-album" element={<AlbumCategory />} />
            <Route path="/upload-media" element={<UploadMedia />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Navigate to="/signup" />} />
            <Route path="/memory-album" element={<Navigate to="/signup" />} />
            <Route path="/event-album" element={<Navigate to="/signup" />} />
            <Route path="/category-album" element={<Navigate to="/signup" />} />
            <Route path="/upload-media" element={<Navigate to="/signup" />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
