import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return user && user.id ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
