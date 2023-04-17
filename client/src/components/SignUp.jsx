import React, { useState, useEffect } from "react";
import Shoe from "../assets/shoe3.JPG";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const SignUp = ({ setStoredToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const signUpFunctionality = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          password,
          email,
          username,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          console.log(data);
          setStoredToken(data.jwt);
          navigate("/");
        } else {
          alert("Please fill out all fields");
        }
      });
  };

  return (
    <div
      className="flex justify-center items-center mx-auto h-screen  bg-contain bg-center bg-no-repeat w-full h-[88vh] "
      style={{
        backgroundImage: `url(${Shoe})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
      <div className="w-96 p-6 bg-white bg-opacity-70 rounded-2xl shadow-5xl border">
        <h1 className="text-3xl block text-center  font-semibold">Sign Up</h1>
        <hr className="mt-3 border-gray-400"></hr>

        <div className="mb-3 mt-3">
          <label className="font-medium mb-2 flex">Username</label>
          <input
            type="text"
            placeholder="Username"
            className="w-full input-black border rounded-md bg-transparent border-gray-500 p-3 "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3 mt-3">
          <label className="font-medium mb-2 flex">Email</label>
          <input
            type="text"
            placeholder="Email"
            className="w-full input-black border rounded-md bg-transparent border-gray-500 p-3 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="font-medium mb-2 flex">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full input-black border rounded-md bg-transparent border-gray-500 p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="mt-3 block bg-blue-700 hover:bg-blue-800 text-white w-full py-2 px rounded"
          onClick={signUpFunctionality}
        >
          Sign Up
        </button>

        <div className="mt-3">
          Already have an account ?{" "}
          <Link className="text-blue-700 cursor-pointer" to="/login">
            Sign in
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

export default SignUp;
