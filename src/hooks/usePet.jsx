import { useContext } from "react";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";

export const usePet = () => {
  const { actions } = useContext(Context);
  const { onLogin } = actions;

  const createPet = async (petData) => {
    try {
      const response = await fetch("http://localhost:5004/createPet", {
        method: "POST",
        body: petData,
      });

      if (!response.ok) {
        if (response.status == 409) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La mascota ya existe",
          });
          return false;
        } else {
          throw new Error(`message: ${response.statusText}`);
        }
      }

      const { data: user } = await response.json();

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
        title: "Nueva mascota agregada!",
        showConfirmButton: false,
        timer: 2000,
      });
      return user;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      console.log(error);
      return error;
    }
  };

  return {
    createPet,
  };
};
