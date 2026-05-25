import Swal from "sweetalert2";

export const successAlert = (title = "Success") => {
  return Swal.fire({
    icon: "success",
    title,
    timer: 1500,
    showConfirmButton: false,
  });
};

export const errorAlert = (title = "Something went wrong") => {
  return Swal.fire({
    icon: "error",
    title,
  });
};

export const confirmAlert = (title = "Are you sure?") => {
  return Swal.fire({
    title,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4f46e5",
    cancelButtonColor: "#ef4444",
    confirmButtonText: "Yes",
  });
};