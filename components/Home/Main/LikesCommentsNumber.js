import LikesNumber from './Buttons/LikesNumber';
import CommentsNumber from './CommentsNumber';

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
      <LikesNumber
        numberOfLikes={numberOfLikes}
        likes={likes}
        username={username}
      />
      <CommentsNumber
        openCommentInput={openCommentInput}
        setOpenCommentInput={setOpenCommentInput}
        commentsLength={commentsLength}
      />
    </ul>
  );
};

export default LikesCommentsNumber;
