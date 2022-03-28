const LikesCommentsNumber = ({
  likes,
  username,
  setOpenCommentInput,
  openCommentInput,
  commentsLength,
}) => {
  const numberOfLikes = likes?.length;

  return (
    <ul className="flex justify-between items-center mt-2 sm:text-sm text-gray-500 dark:text-gray-300 text-xs mx-2 sm:mx-5">
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
      <li
        onClick={() => {
          openCommentInput
            ? setOpenCommentInput(false)
            : setOpenCommentInput(true);
        }}
        className="flex justify-end cursor-pointer hover:underline"
      >
        {commentsLength > 0 && (
          <p>
            {commentsLength === 1 ? (
              <>{commentsLength} comentario</>
            ) : (
              <>{commentsLength} comentarios</>
            )}{' '}
          </p>
        )}
      </li>
    </ul>
  );
};

export default LikesCommentsNumber;
