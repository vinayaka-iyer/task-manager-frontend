import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const getTasks = async (page = 1, limit = 10) => {
    try {
      const token = localStorage.getItem("token"); 
  
      const response = await axios.get(`${API_BASE_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,   
          limit,
        },
      });
  
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message; 
    }
  };