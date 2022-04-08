import { useDateTimeFormat } from 'hooks/useDateTimeFormat';
import { useTimeAgo } from 'hooks/useTimeAgo';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import { useState } from 'react';
import ButtonDeleteAnswer from '../Buttons/ButtonDeleteAnswer';
import { ButtonEditComment } from '../Buttons/ButtonEditComment';
import FormCommentAnswer from '../Forms/FormCommentAnswer';

const Answer = ({
  id,
  linkId,
  userId,
  username,
  avatar,
  answer,
  commentId,
  timestamp,
  isEdited,
  comments,
  setComments,
}) => {
  const user = useUser();
  const [openAllComment, setOpenAllComment] = useState(false);
  const [openEditAnswer, setOpenEditAnswer] = useState(false);

  if (timestamp !== null) {
    const createdAt = new Date(parseInt(timestamp?.seconds * 1000));
  }
  const timeago = useTimeAgo(createdAt !== undefined && createdAt);
  const createdAtFormated = useDateTimeFormat(
    createdAt !== undefined && createdAt
  );

  return (
    <div className="flex justify-center w-full pb-4 ml-1">
      <div className="w-8 h-8 mt-1 mr-2">
        <Image
          className="rounded-full"
          src={avatar}
          height={150}
          width={150}
          alt={answer}
        />
      </div>
      <div className="p-2 w-[90%] bg-gray-100 rounded-lg dark:bg-gray-800">
        <div className="flex justify-between">
          <div>
            <p className="mr-2 font-semibold">{username}</p>

            <p className="mb-1 text-xs font-light dark:text-gray-300 sm:text-sm">
              <time title={createdAtFormated}>{timeago}</time>
              {isEdited && <span className="ml-1">• Editado •</span>}
            </p>
          </div>
          {userId === user?.id && !openEditAnswer && (
            <p className="-mt-1">
              <ButtonEditComment
                isAnswer={true}
                setOpeneditAnswer={setOpenEditAnswer}
              />
              <ButtonDeleteAnswer
                commentId={commentId}
                linkId={linkId}
                answerId={id}
              />
            </p>
          )}
        </div>
        {openEditAnswer ? (
          <FormCommentAnswer
            setOpenEditAnswer={setOpenEditAnswer}
            answer={answer}
            linkId={linkId}
            commentId={commentId}
            id={id}
            isEditing={true}
            comments={comments}
            setComments={setComments}
          />
        ) : (
          <p className="overflow-hidden text-sm">
            {answer.substring(0, 260)}
            {answer.length > 240 && !openAllComment && (
              <button
                onClick={() => setOpenAllComment(true)}
                className="pl-1 text-sm dark:text-gray-300 dark:hover:text-gray-400 text-violet-600 hover:text-violet-700 hover:underline"
              >
                ...ver más
              </button>
            )}
            {openAllComment && <>{answer.substring(260, 1250)}</>}
          </p>
        )}
      </div>
    </div>
  );
};

export default Answer;
