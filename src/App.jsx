import { BrowserRouter, Routes, Route } from "react-router-dom";
import injectContext from "./store/appContext";
import Login from './views/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/" element={<h1 className="text-center">hola mundo</h1>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default injectContext(App);
