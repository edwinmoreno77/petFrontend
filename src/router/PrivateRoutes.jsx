import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoutes = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
