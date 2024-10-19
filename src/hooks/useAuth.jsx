import { useContext } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const useAuth = () => {
  const { actions } = useContext(Context);
  const { onChecking, onLogin, onLogout } = actions;

  const createUser = async (userData) => {
    try {
      onChecking();
      const response = await fetch("http://localhost:5004/createUser", {
        method: "POST",
        body: userData,
      });

      if (!response.ok) {
        if (response.status == 409) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El Usuario ya existe",
          });
          onLogout();
          return false;
        } else {
          throw new Error(`message: ${response.statusText}`);
        }
      }

      const data = await response.json();
      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());

      onLogin({
        id: user.id,
        rut: user.rut,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        direction: user.direction,
        comuna: user.comuna,
        region: user.region,
        cellphone: user.cellphone,
        image: user.image,
        pets: user.owned_pets,
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Nueva cuenta creada!",
        showConfirmButton: false,
        timer: 2000,
      });
      return true;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      onLogout(error);
      console.log(error);
      return false;
    }
  };

  const authLogin = async (email, password) => {
    let url = `http://localhost:5004/login`;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    let response = await fetch(url, options);
    let result = await response.json();
    return result;
  };

  return {
    createUser,
    authLogin,
  };
};
