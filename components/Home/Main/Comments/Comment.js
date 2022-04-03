import { useDateTimeFormat } from 'hooks/useDateTimeFormat';
import { useTimeAgo } from 'hooks/useTimeAgo';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import { useState } from 'react';
import AnswersList from './AnswersList';
import ButtonDeleteComment from './ButtonDeleteComment';

const Comment = ({
  commentId,
  linkId,
  avatar,
  comment,
  timestamp,
  userId,
  username,
  index,
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
    <>
      <div className="flex justify-center px-4 pb-1">
        <div className="w-12 h-12 mt-2 mr-2">
          <Image
            className="rounded-full"
            src={avatar}
            height={150}
            width={150}
            alt={comment}
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
                <ButtonDeleteComment
                  commentId={commentId}
                  linkId={linkId}
                  userId={user?.id}
                />
              </p>
            )}
          </div>

          <p className="overflow-hidden text-sm">
            {comment.substring(0, 260)}
            {comment.length > 240 && !openAllComment && (
              <button
                onClick={() => setOpenAllComment(true)}
                className="pl-1 text-sm transition-all duration-150 ease-in text-violet-600 dark:text-gray-300 hover:text-violet-700 dark:hover:text-gray-400 hover:underline"
              >
                ...ver más
              </button>
            )}
            {openAllComment && <>{comment.substring(260, 1250)}</>}
          </p>
        </div>
      </div>

      <AnswersList
        linkId={linkId}
        commentId={commentId}
        userIdFromLink={userIdFromLink}
        index={index}
      />
    </>
  );
};

export default Comment;
