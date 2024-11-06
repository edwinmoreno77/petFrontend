import { Routes, Route, Navigate } from "react-router-dom";
import { Profile } from "../views/profile/Profile";
import { Vaccines } from "../views/Vaccines";
import { Dewormings } from "../views/Dewormings";
import { Calendar } from "../views/Calendar";
import { Navbar } from "../components/ui/Navbar";
import { Home } from "../views/Home";
import { AddPets } from "../views/profile/AddPets";
import { Config } from "../views/profile/Config";
import { Notifications } from "../views/profile/Notifications";

export const PetRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/addpets" element={<AddPets />} />
        <Route path="/profile/config" element={<Config />} />
        <Route path="/profile/notifications" element={<Notifications />} />
        <Route path="/vaccine" element={<Vaccines />} />
        <Route path="/dewormings" element={<Dewormings />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
