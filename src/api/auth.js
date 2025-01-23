import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    if (response.status !== 200) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    // Check for error object in response data (assuming error field exists)
    if (response.data.error) {
      throw new Error(response.data.error); // Or a more specific error message based on the error object
    }
    return response.data; // Return the actual data on successful login
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    // Handle the error appropriately (e.g., display an error message to the user)
    throw error; // Re-throw the error for further handling if needed
  }
};
