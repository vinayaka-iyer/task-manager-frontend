import React, { useState, useContext, useEffect } from "react";
// import { loginUser } from "../../api/auth";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode';

import { login } from "../../redux/authSlice";
import { useLoginMutation } from "../../services/auth/authApiSlice";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [loginMutation, {isLoading}] = useLoginMutation()

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      console.log(credentials)
      const data = await loginMutation( credentials ).unwrap()
      const decoded = jwtDecode(data.token);
      dispatch(login({ token: data.token, user: decoded.userId, username:decoded.username })); // Dispatch login action
      alert("Login successful");
      navigate("/tasks"); // Redirect to tasks page
    } catch (error) {
      console.log(error.response?.data?.message || "Login failed");
      alert("Error: Login failed.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          placeholder="Enter your username"
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="flex justify-between ">
      <Button type="submit">
        Login
      </Button>
      <div className="flex-col justify-center flex">
      <Link to="/register" className=" font-semibold text-sm ">Don't have an account yet? Register Now </Link>
      </div>
      </div>
    </form>
  );
};

export default LoginForm;
