const CommentsNumber = ({
  openCommentInput,
  setOpenCommentInput,
  commentsLength,
}) => {
  return (
    <li className="flex justify-end cursor-pointer hover:underline">
      <button
        onClick={() => {
          openCommentInput
            ? setOpenCommentInput(false)
            : setOpenCommentInput(true);
        }}
      >
        {commentsLength > 0 && (
          <>
            {commentsLength === 1 ? (
              <>{commentsLength} comentario</>
            ) : (
              <>{commentsLength} comentarios</>
            )}{' '}
          </>
        )}
      </button>
    </li>
  );
};

export default CommentsNumber;
