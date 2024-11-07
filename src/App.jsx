import { useEffect, useContext } from "react";
import { Context } from "./store/appContext";
import injectContext from "./store/appContext";
import "./global.css";
import { AppRouter } from "./router/AppRouter";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { actions } = useContext(Context);
  const { revalidateToken } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      actions.onLogin(JSON.parse(user));
      revalidateToken(); // Valida el token al cargar la app
    } else {
      actions.onLogout();
    }
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default injectContext(App);
