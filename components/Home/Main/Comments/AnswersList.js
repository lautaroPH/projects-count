import React from 'react';
import FormCommentAnswer from '../Forms/FormCommentAnswer';
import Answer from './Answer';
import { useState, useEffect } from 'react';
import { getAnswers } from 'firebaseFunction/getAnswers';
import useUser from 'hooks/useUser';

const AnswersList = ({
  linkId,
  commentId,
  comments,
  setComments,
  setCommentsNumber,
}) => {
  const [openAnswerForm, setOpenAnswerForm] = useState(false);
  const [answers, setAnswers] = useState([]);
  const user = useUser();

  useEffect(
    () => getAnswers(linkId, commentId, setAnswers),
    [linkId, commentId]
  );

  return (
    <>
      <div className="flex items-center justify-end px-2 pb-3 mt-1 text-xs">
        {user && (
          <button
            onClick={() => {
              openAnswerForm
                ? setOpenAnswerForm(false)
                : setOpenAnswerForm(true);
            }}
            className="px-1 font-semibold text-gray-500 transition-all duration-200 ease-in-out rounded-sm dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            Responder
          </button>
        )}
        {answers.length > 0 && (
          <>
            {user && <span className="mx-2 -mt-1">.</span>}
            <button
              onClick={() => {
                openAnswerForm
                  ? setOpenAnswerForm(false)
                  : setOpenAnswerForm(true);
              }}
              className="px-1 transition-all duration-200 ease-in-out rounded-sm hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {answers.length === 1 ? (
                <>{answers.length} respuesta</>
              ) : (
                <>{answers.length} respuestas</>
              )}{' '}
            </button>
          </>
        )}
      </div>
      {openAnswerForm && (
        <div className="ml-[48px]">
          {user && (
            <FormCommentAnswer
              linkId={linkId}
              commentId={commentId}
              comments={comments}
              setComments={setComments}
              setCommentsNumber={setCommentsNumber}
            />
          )}
          {answers.length > 0 &&
            answers?.map((answer) => (
              <Answer
                key={answer.id}
                id={answer.id}
                linkId={linkId}
                userId={answer.data().userId}
                username={answer.data().username}
                avatar={answer.data().avatar}
                answer={answer.data().answer}
                commentId={answer.data().commentId}
                timestamp={answer.data().timestamp}
                isEdited={answer.data().isEdited}
                comments={comments}
                setComments={setComments}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default AnswersList;
