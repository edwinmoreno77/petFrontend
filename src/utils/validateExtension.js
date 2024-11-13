import Swal from "sweetalert2";

export const validExtensions = (file) => {
  //TODO: include more extensions
  const validExtensions = ["png", "jpg", "gif", "jpeg", "webp", "svg", "jfif"];
  const extension = file.name.split(".").pop().toLowerCase();

  if (!validExtensions.includes(extension)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La imagen debe ser de tipo: png, jpg, gif, jpeg, webp, svg, jfif ",
    });
    return false;
  }
  return true;
};
