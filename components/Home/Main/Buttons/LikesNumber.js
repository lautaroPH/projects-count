const LikesNumber = ({ numberOfLikes, likes, username }) => {
  return (
    <li>
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
  );
};

export default LikesNumber;
