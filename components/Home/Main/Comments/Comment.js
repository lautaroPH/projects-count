import { useDateTimeFormat } from 'hooks/useDateTimeFormat';
import { useTimeAgo } from 'hooks/useTimeAgo';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import { useState } from 'react';
import ButtonDeleteComment from './ButtonDeleteComment';

const Comment = ({
  commentId,
  linkId,
  avatar,
  comment,
  timestamp,
  userId,
  username,
}) => {
  const user = useUser();
  if (timestamp !== null) {
    const createdAt = new Date(parseInt(timestamp?.seconds * 1000));
  }
  const timeago = useTimeAgo(createdAt !== undefined && createdAt);
  const createdAtFormated = useDateTimeFormat(
    createdAt !== undefined && createdAt
  );

  const [openAllComment, setOpenAllComment] = useState(false);

  return (
    <div className="flex justify-center px-4 py-2">
      <div className="h-12 w-12 mr-2 mt-2">
        <Image
          className="rounded-full"
          src={avatar}
          height={150}
          width={150}
          alt={comment}
        />
      </div>
      <div className="bg-gray-100 w-[90%] rounded-lg p-2 relative">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold">{username}</p>
            <p className="text-xs sm:text-sm font-light mb-1">
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
              className=" pl-1 text-sm text-violet-600 hover:text-violet-700 hover:underline"
            >
              ...ver más
            </button>
          )}
          {openAllComment && <>{comment.substring(260, 1250)}</>}
        </p>
      </div>
    </div>
  );
};

export default Comment;
