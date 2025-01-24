import React, { useState, useContext } from "react";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { login } from '../../redux/authSlice';
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      console.log(credentials)
      const data = await loginUser( credentials )
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
      <Button type="submit">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
