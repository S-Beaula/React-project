import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar1 from './Components/Navbar/navbar';
import Signup from './Components/Authentication/Signup/signup';
import Login from './Components/Authentication/Login/login';
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/dashboard';
import MemoryAlbum from './Components/Dashboard/memory_album';
import EventAlbum from './Components/Dashboard/event_album';
import { onAuthStateChanged } from 'firebase/auth';
import { author } from './authconfig';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false); 
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const userLoggedIn = onAuthStateChanged(author, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => userLoggedIn();
  }, []);

  console.log(user);

  if (loading) {
    return <h1>Loading, please wait...</h1>;
  }

  return (
    <div>
      <Navbar1 
        handleShowSignup={() => setShowSignup(true)} 
        handleShowLogin={() => setShowLogin(true)}
      />
      <Signup show={showSignup} handleClose={() => setShowSignup(false)} /> 
      <Login show={showLogin} handleClose={() => setShowLogin(false)} />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to={'/login'}/>}/>
        <Route path="/memory-album" element={<MemoryAlbum />} />
        <Route path="/event-album" element={<EventAlbum />} />
      </Routes>
    </div>
  );
};

export default App;
