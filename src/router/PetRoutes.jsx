import { Routes, Route, Navigate } from "react-router-dom";
import { Profile } from "../views/Profile";
import { Vaccines } from "../views/Vaccines";
import { Deworming } from "../views/Deworming";
import { Calendar } from "../views/Calendar";
import { Navbar } from "../components/ui/Navbar";
import { Home } from "../views/Home";
import { AddPets } from "../views/AddPets";

export const PetRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/addpets" element={<AddPets />} />
        <Route path="/vaccine" element={<Vaccines />} />
        <Route path="/deworming" element={<Deworming />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
