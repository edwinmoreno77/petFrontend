// import { useContext } from "react";
import Swal from "sweetalert2";
// import { Context } from "../store/appContext";

export const useVaccine = () => {
  //   const { actions } = useContext(Context);
  //   const { onLogin } = actions;

  const createVaccine = async (vaccineData) => {
    try {
      const response = await fetch("http://localhost:5004/createVaccine", {
        method: "POST",
        body: vaccineData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorData.error || response.statusText,
        });
        return false;
      }

      const responseData = await response.json();
      const vaccine = responseData.data;

      console.log("Vacuna creada:", vaccine);

      Swal.fire({
        position: "center",
        icon: "success",
        title: responseData.message || "Vacuna creada exitosamente!",
        showConfirmButton: false,
        timer: 2000,
      });

      return vaccine;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Error desconocido",
      });
      console.log(error);
      return false;
    }
  };

  return {
    createVaccine,
  };
};
