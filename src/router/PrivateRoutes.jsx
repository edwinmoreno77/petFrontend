// import { useContext } from "react";
// import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoutes = ({ children }) => {
  // const { store } = useContext(Context);
  // const { userStatus } = store.userState;

  // return userStatus === "authenticated" ? children : <Navigate to="/login" />;
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
