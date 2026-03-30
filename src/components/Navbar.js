/** @format */

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://zerodha-clone-backend-sztq.onrender.com/logout",
        {},
        { withCredentials: true },
      );

      navigate("/login");
    } catch (error) {
      console.log("Logout failed");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Navbar;
