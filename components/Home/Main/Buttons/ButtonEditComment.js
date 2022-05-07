export const ButtonEditComment = ({
  setOpenEditComment,
  setOpeneditAnswer,
  isAnswer,
}) => {
  return (
    <button
      onClick={() =>
        isAnswer ? setOpeneditAnswer(true) : setOpenEditComment(true)
      }
      className="p-1 mr-2 text-xs md:text-sm text-orange-400 transition-colors duration-300 ease-out border-2 border-transparent rounded-lg hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-400"
    >
      Editar
    </button>
  );
};
