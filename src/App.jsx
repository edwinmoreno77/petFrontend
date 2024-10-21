import { BrowserRouter, Routes, Route } from "react-router-dom";
import injectContext from "./store/appContext";
import "./global.css";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Perfil } from "./views/Perfil";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<h1 className="text-center">hola mundo</h1>}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default injectContext(App);
