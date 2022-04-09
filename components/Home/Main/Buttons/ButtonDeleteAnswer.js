import { deleteAnswer } from 'firebaseFunction/deleteAnswer';
import { useTheme } from 'next-themes';
import { swalConfirmDeleteCommentDark } from 'swals/dark/swalConfirmDeleteCommentDark';
import { swalDeleteLoadingCommentDark } from 'swals/dark/swalDeleteLoadingCommentDark';
import { swalDeleteSucessCommentDark } from 'swals/dark/swalDeleteSucessCommentDark';
import { swalConfirmDeleteCommentLight } from 'swals/light/swalConfirmDeleteCommentLight';
import { swalDeleteLoadingCommentLight } from 'swals/light/swalDeleteLoadingCommentLight';
import { swalDeleteSuccessCommentLight } from 'swals/light/swalDeleteSuccessCommentLight';

import Swal from 'sweetalert2';

const ButtonDeleteAnswer = ({ linkId, commentId, answerId }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleClick = async (linkId, commentId, answerId) => {
    if (currentTheme === 'dark') {
      Swal.fire(swalConfirmDeleteCommentDark).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Swal.fire(swalDeleteLoadingCommentDark);
          deleteAnswer(linkId, commentId, answerId).then(() => {
            Swal.fire(swalDeleteSucessCommentDark);
          });
        }
      });
    } else {
      Swal.fire(swalConfirmDeleteCommentLight).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Swal.fire(swalDeleteLoadingCommentLight);
          deleteAnswer(linkId, commentId, answerId).then(() => {
            Swal.fire(swalDeleteSuccessCommentLight);
          });
        }
      });
    }
  };

  return (
    <button
      className="p-1 text-sm text-red-500 transition-colors duration-300 ease-out border-2 border-transparent rounded-lg hover:text-red-700 dark:hover:text-red-400 hover:border-red-600"
      onClick={() => handleClick(linkId, commentId, answerId)}
    >
      Eliminar
    </button>
  );
};

export default ButtonDeleteAnswer;
