import React from 'react';
import AllButtons from './Buttons/AllButtons';
import LikesCommentsNumber from './LikesCommentsNumber';
import { useState, useEffect } from 'react';
import { getLikes } from 'firebaseFunction/getLikes';
import { getAllComments } from 'firebaseFunction/getAllComments';
import FormComment from './Forms/FormComment';
import Comment from './Comments/Comment';
import useUser from 'hooks/useUser';

const Footer = ({ id, username, dataUserLike, githubRepo, link, title }) => {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [openCommentInput, setOpenCommentInput] = useState(false);
  const [seeAllComments, setSeeAllComments] = useState(false);
  const user = useUser();

  useEffect(() => getLikes(id, setLikes), [id]);
  useEffect(() => getAllComments(id, setComments), [id]);

  return (
    <>
      <LikesCommentsNumber
        likes={likes}
        username={username}
        openCommentInput={openCommentInput}
        setOpenCommentInput={setOpenCommentInput}
        commentsLength={comments.length}
      />

      <AllButtons
        id={id}
        dataUserLike={dataUserLike}
        likes={likes}
        githubRepo={githubRepo}
        link={link}
        setOpenCommentInput={setOpenCommentInput}
        openCommentInput={openCommentInput}
      />

      {openCommentInput && (
        <div className="mb-3">
          {user && <FormComment id={id} title={title} />}

          {comments.map((comment, i) => {
            return i <= 9 ? (
              <Comment
                key={comment.id}
                linkId={id}
                index={i}
                commentId={comment.id}
                avatar={comment.data().avatar}
                comment={comment.data().comment}
                timestamp={comment.data().timestamp}
                userId={comment.data().userId}
                username={comment.data().username}
                seeAllComments={seeAllComments}
              />
            ) : (
              seeAllComments && (
                <Comment
                  key={comment.id}
                  linkId={id}
                  index={i}
                  commentId={comment.id}
                  avatar={comment.data().avatar}
                  comment={comment.data().comment}
                  timestamp={comment.data().timestamp}
                  userId={comment.data().userId}
                  username={comment.data().username}
                  seeAllComments={seeAllComments}
                />
              )
            );
          })}
          {comments.length <= 0 && (
            <p className="px-2 py-1 ml-2 text-base font-semibold text-gray-500 dark:text-gray-300">
              No hay comentarios para ver
            </p>
          )}
          {!seeAllComments && comments.length > 10 && (
            <button
              className="px-2 py-1 ml-2 text-sm font-semibold text-gray-500 transition-all duration-200 ease-in-out rounded-md hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setSeeAllComments(true)}
            >
              Ver todos los comentários
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Footer;
