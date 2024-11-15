import Swal from "sweetalert2";

export const useDeworming = () => {
  const createDeworming = async (dewormingData) => {
    try {
      const response = await fetch("http://localhost:5004/createDeworming", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dewormingData),
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
      const deworming = responseData.data;

      console.log("Desparasitación creada:", deworming);

      Swal.fire({
        position: "center",
        icon: "success",
        title: responseData.message || "Desparasitación creada exitosamente!",
        showConfirmButton: false,
        timer: 2000,
      });

      return { success: true, data: deworming };
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
    createDeworming,
  };
};
