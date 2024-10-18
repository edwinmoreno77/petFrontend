import Swal from "sweetalert2";

export const validExtensions = (file) => {
  //TODO: include more extensions
  const validExtensions = ["png", "jpg", "gif", "jpeg"];
  const extension = file.name.split(".")[1];

  if (!validExtensions.includes(extension)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La imagen debe ser de tipo: png, jpg, gif, jpeg ",
    });
    return false;
  }
  return true;
};
