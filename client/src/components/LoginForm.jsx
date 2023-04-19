import React, { useState } from "react";
import Shoe from "../assets/shoe3.JPG";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
const LoginForm = ({ setStoredToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:3000/api/v1/login", {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          setStoredToken(data.jwt);
          navigate("/");
        } else {
          alert("Invalid credentials");
        }
      });

    setUsername("");
    setPassword("");
  };

  return (
    <div
      className="flex justify-center items-center mx-auto h-screen bg-black bg-contain bg-center bg-no-repeat w-full h-[88vh]"
      style={{
        backgroundImage: `url(${Shoe})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
      <div className="w-96 p-6 bg-white bg-opacity-70 rounded-2xl shadow-5xl border">
        <h1 className="text-3xl block text-center  font-semibold">Login</h1>
        <hr className="mt-3 border-gray-400"></hr>

        <div className="mb-3 mt-3">
          <label className="font-medium mb-2 flex">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full input-black border rounded-md bg-transparent border-gray-500 p-3 "
          />
        </div>

        <div className="mb-3">
          <label className="font-medium mb-2 flex">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full input-black border rounded-md bg-transparent border-gray-500 p-3"
          />
        </div>
        <div>
          <label className="mr-16">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
        </div>
        <button
          className="mt-3 block bg-blue-700 hover:bg-blue-800 text-white w-full py-2 px rounded"
          onClick={handleSubmit}
        >
          Sign In
        </button>

        <div className="mt-3">
          Don't have an account yet?{" "}
          <Link className="text-blue-700 cursor-pointer" to="/signup">
            Sign up
          </Link>
        </div>

        <div className="flex justify-center items-center mt-10">
          <a href="https://www.facebook.com/">
            <FaFacebook className="text-blue-700 mx-3" size={24} />
          </a>
          <a href="https://www.instagram.com/">
            <FaInstagram className="text-pink-500 mx-3" size={24} />
          </a>
          <a href="https://twitter.com/">
            <FaTwitter className="text-blue-500 mx-3" size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
