import React from 'react';
import AllButtons from './Buttons/AllButtons';
import LikesCommentsNumber from './LikesCommentsNumber';
import { useState, useEffect } from 'react';
import CommentsList from './Comments/CommentsList';
import { getLikes } from 'firebaseFunction/getLikes';
import { getComments } from 'firebaseFunction/getComments';

const Footer = ({ id, username, dataUserLike, githubRepo, link, title }) => {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [openCommentInput, setOpenCommentInput] = useState(false);

  useEffect(() => getLikes(id, setLikes), [id]);
  useEffect(() => getComments(id, setComments), [id]);

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
        <CommentsList
          id={id}
          title={title}
          openCommentInput={openCommentInput}
          comments={comments}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default Footer;
