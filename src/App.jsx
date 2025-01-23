import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import TasksPage from "./pages/Tasks/TaskPage";
import CreateTaskPage from "./pages/Tasks/CreateTaskPage"
import RootLayout from "./layout";

function App() {
  return (
    <>
    <AuthProvider>
      
        <Router>
        <RootLayout >
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/create" element={<CreateTaskPage />} />
            {/* <Route path="/tasks/:id/edit" element={<EditTask />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          </RootLayout>
      </Router>
  </AuthProvider>
  
    </>
  )
}

export default App
