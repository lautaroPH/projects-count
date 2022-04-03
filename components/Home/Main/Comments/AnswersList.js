import React from 'react';
import AnswerCommentForm from '../Forms/AnswerCommentForm';
import Answer from './Answer';
import { useState, useEffect } from 'react';
import { getAnswers } from 'firebaseFunction/getAnswers';
import useUser from 'hooks/useUser';
const AnswersList = ({ linkId, commentId, index }) => {
  const [openAnswerForm, setOpenAnswerForm] = useState(false);
  const [answers, setAnswers] = useState([]);
  const user = useUser();

  useEffect(
    () => getAnswers(linkId, commentId, setAnswers),
    [linkId, commentId]
  );

  return (
    <>
      <div className="flex items-center justify-end px-5 pb-3 text-xs">
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
        <div className="ml-[57px] px-4">
          {user && (
            <AnswerCommentForm
              index={index}
              linkId={linkId}
              commentId={commentId}
            />
          )}
          {answers.length > 0 ? (
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
              />
            ))
          ) : (
            <p className="pb-2 text-sm font-semibold text-gray-500 dark:text-gray-300">
              No hay respuestas para ver
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default AnswersList;
