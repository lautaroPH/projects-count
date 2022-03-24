import { deleteLink } from 'firebaseMain/firebaseFunction';
import { useTheme } from 'next-themes';
import {
  swalConfirmDeleteDark,
  swalConfirmDeleteLight,
  swalDeleteSuccessLight,
  swalDeleteSucessDark,
} from 'swals/swalsComponents';
import Swal from 'sweetalert2';
const ButtonDelete = ({ id, image }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleClick = (id, image) => {
    if (currentTheme === 'dark') {
      Swal.fire(swalConfirmDeleteDark).then((respuesta) => {
        if (respuesta.isConfirmed) {
          deleteLink(id, image);
          Swal.fire(swalDeleteSucessDark);
        }
      });
    } else {
      Swal.fire(swalConfirmDeleteLight).then((respuesta) => {
        if (respuesta.isConfirmed) {
          deleteLink(id, image);
          Swal.fire(swalDeleteSuccessLight);
        }
      });
    }
  };

  return (
    <button
      className="text-red-500 transition-colors border-2 border-transparent ease-out duration-300 
    hover:text-red-700 dark:hover:text-red-400 hover:border-red-600 p-1 rounded-lg"
      onClick={() => handleClick(id, image)}
    >
      Eliminar
    </button>
  );
};

export default ButtonDelete;
