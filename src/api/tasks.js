import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// GET all tasks
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

// GET task
export const getTask = async (id) => {
    try {
        const token = localStorage.getItem("token"); 
    
        const response = await axios.get(`${API_BASE_URL}/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        return response.data;
      } catch (error) {
        throw error.response?.data?.message || error.message; 
      }
}

// Delete a task
export const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete the task.");
    }
  };

 // Create a task
export const createTask = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/tasks/`,
        data ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create the task.");
    }
  };

 // Edit a task
export const editTask = async (data, task) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(`${API_BASE_URL}/tasks/${task._id}`,
      data ,
      {
        headers: {
          Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error("Error creating task:", err);
    alert("Failed to create the task.");
  }
};