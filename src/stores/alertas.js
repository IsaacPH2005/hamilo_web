import Swal from 'sweetalert2';

export const mensajeExitoso = () => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Tu trabajo ha sido guardado.",
        showConfirmButton: false,
        timer: 1500
    });
};