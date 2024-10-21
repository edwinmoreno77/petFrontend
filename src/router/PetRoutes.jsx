import { Routes, Route, Navigate } from "react-router-dom";
import { Perfil } from "../views/Perfil";
import { Vaccines } from "../views/Vaccines";
import { Deworming } from "../views/Deworming";
import { Calendar } from "../views/Calendar";

export const PetRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/vaccine" element={<Vaccines />} />
        <Route path="/deworming" element={<Deworming />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
