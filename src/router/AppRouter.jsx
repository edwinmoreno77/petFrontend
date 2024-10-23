import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { Register } from "../views/Register";
import { PetRoutes } from "./PetRoutes";
import { Home } from "../views/Home";
import { Login } from "../views/Login";
import { Navbar } from "../components/ui/Navbar";

export const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="home" element={<Home />} />
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
