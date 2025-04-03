import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar1 from "./Components/Navbar/navbar";
import Signup from "./Components/Authentication/Signup/signup";
import Login from "./Components/Authentication/Login/login";
import Dashboard from "./Components/Dashboard/dashboard";
import MemoryAlbum from "./Components/Dashboard/memory_album";
import EventAlbum from "./Components/Dashboard/event_album";
import AlbumCategory from "./Components/Dashboard/album_category";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { author } from "./authconfig";

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
    return <h1>Loading, please wait...</h1>;
  }

  return (
    <div>
      {!user && (
        <Navbar1
          handleShowSignup={() => setShowSignup(true)}
          handleShowLogin={() => setShowLogin(true)}
        />
      )}

      <Signup show={showSignup} handleClose={() => setShowSignup(false)} />
      <Login show={showLogin} handleClose={() => setShowLogin(false)} />

      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />

        {user ? (
          <>
            <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
            <Route path="/memory-album" element={<MemoryAlbum />} />
            <Route path="/event-album" element={<EventAlbum />} />
            <Route path="/category-album" element={<AlbumCategory />} />

          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Navigate to="/signup" />} />
            <Route path="/memory-album" element={<Navigate to="/signup" />} />
            <Route path="/event-album" element={<Navigate to="/signup" />} />
            <Route path="/friends" element={<Navigate to="/signup" />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
