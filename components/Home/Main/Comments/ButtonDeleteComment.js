import { deleteComment } from 'firebaseFunction/deleteComment';
import { useTheme } from 'next-themes';
import {
  swalConfirmDeleteCommentDark,
  swalConfirmDeleteCommentLight,
  swalDeleteLoadingCommentDark,
  swalDeleteLoadingCommentLight,
  swalDeleteSuccessCommentLight,
  swalDeleteSucessCommentDark,
} from 'swals/swalsComponents';
import Swal from 'sweetalert2';

const ButtonDeleteComment = ({ linkId, commentId, userId }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleClick = async (linkId, commentId) => {
    if (currentTheme === 'dark') {
      Swal.fire(swalConfirmDeleteCommentDark).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Swal.fire(swalDeleteLoadingCommentDark);
          deleteComment(linkId, commentId, userId).then(() => {
            Swal.fire(swalDeleteSucessCommentDark);
          });
        }
      });
    } else {
      Swal.fire(swalConfirmDeleteCommentLight).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Swal.fire(swalDeleteLoadingCommentLight);
          deleteComment(linkId, commentId, userId).then(() => {
            Swal.fire(swalDeleteSuccessCommentLight);
          });
        }
      });
    }
  };

  return (
    <button
      className="text-red-500 transition-colors border-2 border-transparent ease-out duration-300 text-sm
    hover:text-red-700 dark:hover:text-red-400 hover:border-red-600 p-1 rounded-lg"
      onClick={() => handleClick(linkId, commentId)}
    >
      Eliminar
    </button>
  );
};

export default ButtonDeleteComment;
