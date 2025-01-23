import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import TasksPage from "./pages/Tasks/TaskPage";
import CreateTaskPage from "./pages/Tasks/CreateTaskPage"
import RootLayout from "./layout";
import { ThemeProvider } from "./components/theme/theme-provider";
import { DocsPage } from "./pages/Docs/DocsPage";

function App() {
  return (
    <>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">

        <Router>
          <RootLayout >
            <Routes>
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/tasks/create" element={<CreateTaskPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/docs" element={<DocsPage />} />
            </Routes>
          </RootLayout>
        </Router>
      </ThemeProvider>
  </AuthProvider>
  
    </>
  )
}

export default App
