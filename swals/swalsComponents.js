const swalConfirmDeleteDark = {
  icon: 'warning',
  text: '¿Estas seguro de querer eliminar para siempre este link?',
  confirmButtonText: 'Eliminar definitivamente',
  background: 'rgb(17 24 39)',
  color: '#fff',
  showCancelButton: `Cancelar`,
  confirmButtonColor: '#f00',
};

const swalConfirmDeleteLight = {
  icon: 'warning',
  text: '¿Estas seguro de querer eliminar para siempre este link?',
  confirmButtonText: 'Eliminar definitivamente',
  showCancelButton: `Cancelar`,
  confirmButtonColor: '#f00',
};

const swalDeleteSucessDark = {
  text: 'El link fue eliminado con exito',
  background: 'rgb(17 24 39)',
  color: '#fff',
  icon: 'success',
  timer: '2000',
};

const swalDeleteSuccessLight = {
  text: 'El link fue eliminado con exito',
  icon: 'success',
  timer: '2000',
};

const swalUploadingLinkDark = (title) => {
  return {
    imageUrl:
      'https://res.cloudinary.com/dv1ksnrvk/image/upload/v1647967168/Dual_Ring-1s-200px_1_wl4kwa.gif',
    imageHeight: 80,
    imageWidth: 80,
    background: 'rgb(17 24 39)',
    color: '#fff',
    title: `Guardando proyecto: "${title}"`,
    text: 'Esto podria demorar unos segundos',
  };
};

const swalUploadingLinkLight = (title) => {
  return {
    imageUrl:
      'https://res.cloudinary.com/dv1ksnrvk/image/upload/v1647907326/Dual_Ring-1s-200px_j4unt1.gif',
    imageHeight: 80,
    imageWidth: 80,
    title: `Guardando proyecto: "${title}"`,
    text: 'Esto podria demorar unos segundos',
  };
};

const swalUploadLinkSuccessDark = (title) => {
  return {
    icon: 'success',
    background: 'rgb(17 24 39)',
    color: '#fff',
    title: `${title} guardado correctamente`,
  };
};

const swalUploadLinkSuccessLight = (title) => {
  return {
    icon: 'success',
    title: `${title} guardado correctamente`,
  };
};

export {
  swalConfirmDeleteDark,
  swalConfirmDeleteLight,
  swalDeleteSucessDark,
  swalDeleteSuccessLight,
  swalUploadingLinkDark,
  swalUploadingLinkLight,
  swalUploadLinkSuccessDark,
  swalUploadLinkSuccessLight,
};
