import Answer from './Answer';
import { useState, useEffect } from 'react';
import { getAnswers } from 'firebaseFunction/getAnswers';
import useUser from 'hooks/useUser';
import ModalAnswerForm from 'components/Modals/ModalAnswerForm';

const AnswersList = ({
  linkId,
  commentId,
  comments,
  setComments,
  setCommentsNumber,
  openAnswers,
  setOpenAnswers,
  avatar,
  username,
  createdAtFormated,
  timeago,
  comment,
}) => {
  const [answers, setAnswers] = useState([]);
  const [openAnswerFormModal, setOpenAnswerFormModal] = useState(false);

  const user = useUser();

  useEffect(
    () => getAnswers(linkId, commentId, setAnswers),
    [linkId, commentId]
  );

  useEffect(
    () => answers.length === 0 && setOpenAnswers(false),
    [answers, setOpenAnswers]
  );

  return (
    <div className="relative w-full">
      {openAnswers && (
        <div className="absolute w-1 text-center bg-gray-300 h-7 -top-2 rounded-s left-[14px] md:left-5 dark:bg-gray-800"></div>
      )}

      <div className="flex items-center justify-end pb-3 mt-1 text-xs w-full sm:w-[96%] md:w-full  xl:px-2">
        {user && (
          <button
            onClick={() => setOpenAnswerFormModal(true)}
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
                openAnswers ? setOpenAnswers(false) : setOpenAnswers(true);
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
      {openAnswers && (
        <div>
          {answers.length > 0 &&
            answers?.map((answer, i) => (
              <Answer
                key={answer.id}
                id={answer.id}
                lastAnswer={i === answers.length - 1}
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
      {openAnswerFormModal && (
        <ModalAnswerForm
          openForm={openAnswerFormModal}
          setOpenForm={setOpenAnswerFormModal}
          linkId={linkId}
          commentId={commentId}
          comments={comments}
          setComments={setComments}
          setCommentsNumber={setCommentsNumber}
          avatar={avatar}
          username={username}
          createdAtFormated={createdAtFormated}
          timeago={timeago}
          comment={comment}
          setOpenAnswers={setOpenAnswers}
        />
      )}
    </div>
  );
};

export default AnswersList;
