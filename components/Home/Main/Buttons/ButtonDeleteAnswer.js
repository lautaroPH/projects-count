import { deleteAnswer } from 'firebaseFunction/deleteAnswer';
import { useTheme } from 'next-themes';
import {
  swalConfirmDeleteAnswerDark,
  swalConfirmDeleteAnswerLight,
  swalDeleteLoadingAnswerDark,
  swalDeleteLoadingAnswerLight,
  swalDeleteSuccessAnswerLight,
  swalDeleteSucessAnswerDark,
} from 'swals/swalsComponents';
import Swal from 'sweetalert2';

const ButtonDeleteAnswer = ({ linkId, commentId, answerId }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleClick = async (linkId, commentId, answerId) => {
    if (currentTheme === 'dark') {
      Swal.fire(swalConfirmDeleteAnswerDark).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Swal.fire(swalDeleteLoadingAnswerDark);
          deleteAnswer(linkId, commentId, answerId).then(() => {
            Swal.fire(swalDeleteSucessAnswerDark);
          });
        }
      });
    } else {
      Swal.fire(swalConfirmDeleteAnswerLight).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Swal.fire(swalDeleteLoadingAnswerLight);
          deleteAnswer(linkId, commentId, answerId).then(() => {
            Swal.fire(swalDeleteSuccessAnswerLight);
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
