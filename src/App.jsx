import injectContext from "./store/appContext";
<<<<<<< HEAD
import "./global.css";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Perfil } from "./views/Perfil";
=======
import { AppRouter } from "./router/AppRouter";
>>>>>>> 2e06c26da2fcfaf8dc9094c71175f759a58e11d9

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default injectContext(App);
