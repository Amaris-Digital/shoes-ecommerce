import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from './components/SplashScreen'
import LoginForm from "./components/LoginForm";
import './App.css'

function App() {
  const [storedToken, setStoredToken] = useState(localStorage.getItem("token"));
  const [loggedInUserId, setLoggedInUserId] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/v1/profile ", {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoggedInUserId(data.user.id);
      });
  }, [storedToken]);

  return (
    <div className="App bg-black">
    
    <Routes>
      
    {storedToken ? null : 
    <Route path="/" element={<SplashScreen />} />}

    <Route
          path="/login"
          element={<LoginForm setStoredToken={setStoredToken} />}
        />

    </Routes>
  </div>
  )
}

export default App
