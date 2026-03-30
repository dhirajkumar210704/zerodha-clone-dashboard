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
    window.location.href = "http://localhost:3000/login";
    return null;
  }

  return children;
};

export default ProtectedRoute;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const ProtectedRoute = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     axios
//       .get("https://zerodha-clone-backend-sztq.onrender.com/dashboard", {
//         withCredentials: true,
//       })
//       .then(() => {
//         setAuthorized(true);
//         setLoading(false);
//       })
//       .catch(() => {
//         window.location.href = "http://localhost:3001/login";
//       });
//   }, []);

//   if (loading) return null;

//   return authorized ? children : null;
// };

// export default ProtectedRoute;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const ProtectedRoute = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     axios
//       .get("https://zerodha-clone-backend-sztq.onrender.com/dashboard", {
//         withCredentials: true,
//       })
//       .then(() => {
//         setAuthorized(true);
//         setLoading(false);
//       })
//       .catch(() => {
//         setAuthorized(false);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   if (!authorized) {
//     return (window.location.href = "http://localhost:3001/login");
//   }

//   return children;
// };

// export default ProtectedRoute;
