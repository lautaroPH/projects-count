const MensajeForCommentAndAnswerValidation = ({ value }) => {
  return (
    <>
      {value >= 1200 && value <= 1250 && (
        <p className="ml-3 text-sm font-semibold text-violet-600 dark:text-gray-300">
          {value}
        </p>
      )}
      {value > 1250 && (
        <p className="ml-3 text-sm font-semibold text-red-500 dark:text-red-600 mt-[-5px]">
          <span className="-mt-48 text-base">-</span>
          {value - 1250}
        </p>
      )}
    </>
  );
};

export default MensajeForCommentAndAnswerValidation;
