import { useContext } from "react";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const usePet = () => {
  const { actions } = useContext(Context);

  const { onLogin } = actions;
  const navigate = useNavigate();

  const createPet = async (petData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5004/createPet", {
        method: "POST",
        headers: { authorization: "Bearer " + token },
        body: petData,
      });

      if (response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Su sesión ha expirado. Por favor, inicie sesión nuevamente.",
        }).then(() => {
          navigate("/login");
        });
        return;
      }

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

  const deletePet = async (petId, userId) => {
    try {
      const token = localStorage.getItem("token");
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#757575",
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const response = await fetch("http://localhost:5004/deletePet", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
          body: JSON.stringify({ petId, userId }),
        });

        if (response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Su sesión ha expirado. Por favor, inicie sesión nuevamente.",
          }).then(() => {
            navigate("/login");
          });
          return;
        }

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
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
          title: "Eliminado!",
          text: "La mascota ha sido eliminada.",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      console.log(error);
    }
  };

  return {
    createPet,
    deletePet,
  };
};
