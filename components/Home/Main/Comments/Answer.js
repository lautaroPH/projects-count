import { XIcon } from '@heroicons/react/solid';
import { useDateTimeFormat } from 'hooks/useDateTimeFormat';
import { useTimeAgo } from 'hooks/useTimeAgo';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import { useState } from 'react';
import ButtonDeleteAnswer from '../Buttons/ButtonDeleteAnswer';
import { ButtonEditComment } from '../Buttons/ButtonEditComment';
import FormCommentAnswer from '../Forms/FormCommentAnswer';
import Link from 'next/link';

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
  lastAnswer,
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
    <div className="flex w-full">
      <div className="relative flex flex-col items-center mt-2 mr-3">
        <div className="absolute w-1 h-4 mt-1 text-center bg-gray-300 rounded-sm -top-6 dark:bg-gray-800"></div>
        <div className="w-8 h-8 md:w-11 md:h-11">
          <Image
            className="rounded-full"
            src={avatar}
            height={150}
            width={150}
            alt={answer}
          />
        </div>
        {!lastAnswer && (
          <div className="w-1 h-full mt-1 text-center bg-gray-300 rounded-sm dark:bg-gray-800"></div>
        )}
      </div>
      <div className="p-2 w-[90%] bg-gray-100 rounded-lg dark:bg-gray-800 mb-4">
        <div className="flex justify-between">
          <div>
            <Link href={`/usuario/${userId}`}>
              <a>
                <p className="mr-2 text-sm font-semibold hover:underline">
                  {username}
                </p>
              </a>
            </Link>

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
          {openEditAnswer && (
            <XIcon
              className="w-6 h-6 pr-1 text-gray-400 cursor-pointer"
              onClick={() => setOpenEditAnswer(false)}
            />
          )}
        </div>
        {openEditAnswer ? (
          <FormCommentAnswer
            setOpenForm={setOpenEditAnswer}
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
