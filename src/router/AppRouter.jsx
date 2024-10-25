import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { Register } from "../views/Register";
import { PetRoutes } from "./PetRoutes";
import { LandingPage } from "../views/LandingPage";
import { Login } from "../views/Login";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <PetRoutes />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
};
