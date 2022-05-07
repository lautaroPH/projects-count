import AllButtons from './Buttons/AllButtons';
import LikesCommentsNumber from './LikesCommentsNumber';
import { useState, useEffect } from 'react';
import { getLikes } from 'firebaseFunction/getLikes';
import { getComments } from 'firebaseFunction/getComments';
import Comment from './Comments/Comment';
import useUser from 'hooks/useUser';
import { getCommentsNumber } from 'firebaseFunction/getCommentsNumber';
import { getMoreComments } from 'firebaseFunction/getMoreComments';
import ModalCommentForm from 'components/Modals/ModalCommentForm';
import SkeletonLoaderComment from 'components/Loaders/SkeletonLoaderComment';

const Footer = ({
  id,
  dataUserLike,
  githubRepo,
  link,
  title,
  userIdFromLink,
  links,
  setLinks,
  openComment,
  isOneLink,
  avatar,
  username,
  createdAtFormated,
  timeago,
  description,
}) => {
  const user = useUser();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [noComments, setNoComments] = useState(false);
  const [commentsNumber, setCommentsNumber] = useState(null);
  const [openCommentInput, setOpenCommentInput] = useState(openComment);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMoreComments, setLoadingMoreComments] = useState(false);

  useEffect(() => getLikes(id, setLikes), [id]);
  useEffect(
    () =>
      openCommentInput &&
      getComments(id, setComments, setNoComments, setLoading),
    [id, openCommentInput]
  );
  useEffect(() => getCommentsNumber(id).then(setCommentsNumber), [id]);

  const handleLoadMoreComments = () => {
    const lastComment = comments[comments.length - 1];
    setLoadingMoreComments(true);
    getMoreComments(
      id,
      setComments,
      setNoComments,
      lastComment,
      setLoadingMoreComments
    );
  };

  return (
    <>
      <LikesCommentsNumber
        likes={likes}
        username={user?.username}
        openCommentInput={openCommentInput}
        setOpenCommentInput={setOpenCommentInput}
        commentsLength={commentsNumber}
      />

      <AllButtons
        id={id}
        dataUserLike={dataUserLike}
        likes={likes}
        githubRepo={githubRepo}
        link={link}
        setOpenCommentModal={setOpenCommentModal}
        openCommentModal={openCommentModal}
        links={links}
        setLinks={setLinks}
        isOneLink={isOneLink}
      />

      {openCommentInput && (
        <div className="mb-3">
          {loading ? (
            <>
              <SkeletonLoaderComment />
              <SkeletonLoaderComment />
            </>
          ) : (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                linkId={id}
                commentId={comment.id}
                avatar={comment.data().avatar}
                comment={comment.data().comment}
                timestamp={comment.data().timestamp}
                userId={comment.data().userId}
                username={comment.data().username}
                userIdFromLink={userIdFromLink}
                isEdited={comment.data().isEdited}
                comments={comments}
                setComments={setComments}
                commentsNumber={commentsNumber ? commentsNumber : 0}
                links={links}
                setLinks={setLinks}
                setCommentsNumber={setCommentsNumber}
                isOneLink={isOneLink}
              />
            ))
          )}
          {loadingMoreComments && (
            <>
              <SkeletonLoaderComment />
              <SkeletonLoaderComment />
            </>
          )}
          {commentsNumber > comments.length &&
            !noComments &&
            !loading &&
            !loadingMoreComments && (
              <button
                className="px-2 py-1 ml-2 text-sm font-semibold text-gray-500 transition-all duration-200 ease-in-out rounded-md hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={handleLoadMoreComments}
              >
                Ver más cometarios
              </button>
            )}
        </div>
      )}

      {openCommentModal && (
        <ModalCommentForm
          setOpenForm={setOpenCommentModal}
          openForm={openCommentModal}
          linkId={id}
          title={title}
          commentsNumber={commentsNumber ? commentsNumber : 0}
          comments={comments}
          setComments={setComments}
          links={links}
          setLinks={setLinks}
          setCommentsNumber={setCommentsNumber}
          isOneLink={isOneLink}
          avatar={avatar}
          username={username}
          createdAtFormated={createdAtFormated}
          timeago={timeago}
          description={description}
          setOpenComments={setOpenCommentInput}
        />
      )}
    </>
  );
};

export default Footer;
