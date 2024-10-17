import { Route, Routes } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="login"
          element={<PublicRoute>{/* <child /> */}</PublicRoute>}
        />

        <Route
          path="/*"
          element={<PrivateRoute>{/* <home /> */}</PrivateRoute>}
        />
      </Routes>
    </>
  );
};
