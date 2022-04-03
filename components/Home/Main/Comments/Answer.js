import { useDateTimeFormat } from 'hooks/useDateTimeFormat';
import { useTimeAgo } from 'hooks/useTimeAgo';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import { useState } from 'react';
import ButtonDeleteAnswer from './ButtonDeleteAnswer';

const Answer = ({
  id,
  linkId,
  userId,
  username,
  avatar,
  answer,
  commentId,
  timestamp,
  userIdFromLink,
}) => {
  const user = useUser();
  const [openAllComment, setOpenAllComment] = useState(false);

  if (timestamp !== null) {
    const createdAt = new Date(parseInt(timestamp?.seconds * 1000));
  }
  const timeago = useTimeAgo(createdAt !== undefined && createdAt);
  const createdAtFormated = useDateTimeFormat(
    createdAt !== undefined && createdAt
  );

  return (
    <div className="flex pb-4">
      <div className="w-8 h-8 mt-1 mr-2">
        <Image
          className="rounded-full"
          src={avatar}
          height={150}
          width={150}
          alt={answer}
        />
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 w-[90%] rounded-lg p-2 relative">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center">
              <p className="mr-2 font-semibold">{username}</p>
              {userId === userIdFromLink && (
                <span className="px-2 py-[1px] text-gray-100 bg-gray-600 font-light rounded-md dark:bg-gray-300 dark:text-gray-800">
                  Autor
                </span>
              )}
            </div>
            <p className="mb-1 text-xs font-light dark:text-gray-300 sm:text-sm">
              <time title={createdAtFormated}>{timeago}</time>
            </p>
          </div>
          {userId === user?.id && (
            <p className="-mt-1">
              <ButtonDeleteAnswer
                commentId={commentId}
                linkId={linkId}
                answerId={id}
              />
            </p>
          )}
        </div>

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
      </div>
    </div>
  );
};

export default Answer;
