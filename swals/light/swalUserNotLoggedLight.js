import Swal from 'sweetalert2';

export const swalUserNotLoggedLight = () => {
  Swal.fire({
    title: 'Necesitas estar logueado',
    icon: 'warning',
    timer: '2000',
  });
};
