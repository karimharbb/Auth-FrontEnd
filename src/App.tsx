import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const token = localStorage.getItem("AccessToken");
        if (!token) {
          setIsVerified(false);
          return;
        }

        const response = await fetch("http://localhost:3000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsVerified(response.ok);
      } catch (error) {
        console.error("Error validating token:", error);
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };

    validateUser();
  }, []);

  if (loading) {
    return <div className="loading">Checking authentication...</div>;
  }

  return isVerified ? <Outlet /> : <Navigate to="/signin" />;
};

export default App;
