import Swal from 'sweetalert2';

export const swalUserNotLoggedDark = () => {
  Swal.fire({
    title: 'Necesitas estar logueado',
    icon: 'warning',
    background: 'rgb(17 24 39)',
    color: '#fff',
    timer: '2000',
  });
};
