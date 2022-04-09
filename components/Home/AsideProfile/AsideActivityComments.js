import SkeletonLoaderCommentAsideUser from 'components/Loaders/SkeletonLoaderCommentAsideUser';
import { getUserComments } from 'firebaseFunction/getUserComments';
import useUser from 'hooks/useUser';
import { useState, useEffect } from 'react';
import UserComment from './UserComment';

const AsideActivityComments = () => {
  const user = useUser();

  const [comments, setComments] = useState([]);
  const [noComments, setNoComments] = useState(false);

  useEffect(() => {
    if (user?.id) {
      getUserComments(user.id, setComments, setNoComments);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-2">
      <h5 className="text-base font-semibold text-violet-600 dark:text-white">
        Comentarios recientes
      </h5>
      {comments.length === 0 && !noComments ? (
        <SkeletonLoaderCommentAsideUser />
      ) : (
        comments.map((comment, i) => (
          <UserComment
            id={comment.id}
            linkId={comment.data().id}
            i={i}
            commentLength={comments.length}
            title={comment.data().title}
            comment={comment.data().comment}
            key={comment.id}
          />
        ))
      )}
      {noComments && (
        <p className="w-full px-2 mt-1 text-sm text-center text-gray-400 border-b-2 dark:text-gray-300 dark:border-b-gray-800">
          No hay comentarios
        </p>
      )}
    </div>
  );
};

export default AsideActivityComments;
