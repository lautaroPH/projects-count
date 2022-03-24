const LikesCommentsNumber = ({ likes, username }) => {
  const numberOfLikes = likes?.length;

  return (
    <ul className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-300 mx-5">
      <li>
        {numberOfLikes > 0 && likes[0].data().username !== username ? (
          <p>
            Le gusta a {likes[0].data().username}
            {'  '}
            {numberOfLikes > 1 && <>y a {numberOfLikes} más</>}
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
      <li className="flex justify-end">
        <p>10 comentarios</p>
      </li>
    </ul>
  );
};

export default LikesCommentsNumber;
