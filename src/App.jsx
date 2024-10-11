import { BrowserRouter, Routes, Route } from "react-router-dom";
import injectContext from "./store/appContext";
import { Register } from "./views/Register";

function App() {

  return (
     <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1 className="text-center">hola mundo</h1>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default injectContext(App);
