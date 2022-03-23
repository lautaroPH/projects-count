const LikesCommentsNumber = ({ likes, username }) => {
  return (
    <ul className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-300 mx-5">
      <li>
        {likes.length > 0 && likes[0].data().username !== username ? (
          <p>
            Le gusta a {likes[0].data().username}
            {'  '}
            {likes.length > 1 && <>y a {likes.length} más</>}
          </p>
        ) : (
          likes.length > 1 && (
            <p>
              Le gusta a {likes[1].data().username}
              {'  '}
              {likes.length > 1 && <>y a {likes.length - 1} más</>}
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
