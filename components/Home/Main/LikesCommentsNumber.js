const LikesCommentsNumber = ({
  likes,
  username,
  setOpenCommentInput,
  openCommentInput,
  commentsLength,
}) => {
  const numberOfLikes = likes?.length;

  return (
    <ul className="flex items-center justify-between mx-2 mt-2 text-xs text-gray-500 sm:text-sm dark:text-gray-300 sm:mx-5">
      <li className="">
        {numberOfLikes > 0 && likes[0].data().username !== username ? (
          <p>
            Le gusta a {likes[0].data().username}
            {'  '}
            {numberOfLikes > 1 && <>y a {numberOfLikes - 1} más</>}
          </p>
        ) : (
          numberOfLikes > 1 && (
            <p>
              Le gusta a {likes[1].data().username}
              {'  '}
              {numberOfLikes > 1 && <>y a {numberOfLikes - 1} más</>}
            </p>
          )
        )}
      </li>
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
    </ul>
  );
};

export default LikesCommentsNumber;
