import { deleteLink } from 'firebaseFunction/deleteLink';
import { getLinks } from 'firebaseFunction/getLinks';
import { useTheme } from 'next-themes';
import {
  swalConfirmDeleteDark,
  swalConfirmDeleteLight,
  swalDeleteLoadingDark,
  swalDeleteLoadingLight,
  swalDeleteSuccessLight,
  swalDeleteSucessDark,
} from 'swals/swalsComponents';
import Swal from 'sweetalert2';

const ButtonDelete = ({ id, image, userId, setLinks, setNoLinks }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleClick = async (id, image) => {
    if (currentTheme === 'dark') {
      Swal.fire(swalConfirmDeleteDark).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Swal.fire(swalDeleteLoadingDark);
          getLinks(setNoLinks, setLinks);
          deleteLink(id, image, userId).then(() => {
            Swal.fire(swalDeleteSucessDark);
          });
        }
      });
    } else {
      Swal.fire(swalConfirmDeleteLight).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Swal.fire(swalDeleteLoadingLight);
          getLinks(setNoLinks, setLinks);
          deleteLink(id, image, userId).then(() => {
            Swal.fire(swalDeleteSuccessLight);
          });
        }
      });
    }
  };

  return (
    <button
      className="p-1 text-red-500 transition-colors duration-300 ease-out border-2 border-transparent rounded-lg hover:text-red-700 dark:hover:text-red-400 hover:border-red-600"
      onClick={() => handleClick(id, image)}
    >
      Eliminar
    </button>
  );
};

export default ButtonDelete;
