import React, { useState } from "react";
// import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { register } from "../../redux/authSlice";
import { useRegisterMutation } from "../../services/auth/authApiSlice";
import { useDispatch } from "react-redux";

const RegisterForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [registerMutation, {isLoading}] = useRegisterMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await registerUser({ username, password });
      const data = await registerMutation( credentials ).unwrap()
      dispatch(register(credentials))
      alert("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data?.message || "Registration failed");
      alert("Error: Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
