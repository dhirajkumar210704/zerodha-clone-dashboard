/** @format */
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    axios
      .get("https://zerodha-clone-backend-sztq.onrender.com/dashboard", {
        withCredentials: true,
      })
      .then(() => {
        setAuthorized(true);
      })
      .catch(() => {
        setAuthorized(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!authorized) {
    window.location.href = "https://zerodha-clone-frontend-1j7w.vercel.app/login";
    return null;
  }

  return children;
};

export default ProtectedRoute;
