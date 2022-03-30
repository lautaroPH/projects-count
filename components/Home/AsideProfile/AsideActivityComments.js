import SkeletonLoaderCommentAsideUser from 'components/Loaders/SkeletonLoaderCommentAsideUser';
import { getUserComments } from 'firebaseFunction/getUserComments';
import useUser from 'hooks/useUser';
import { useState, useEffect } from 'react';

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
    <div className="mt-2 flex flex-col items-center justify-center w-full">
      <h5 className="text-base font-semibold">Comentarios recientes</h5>
      {comments.length === 0 && !noComments ? (
        <SkeletonLoaderCommentAsideUser />
      ) : (
        comments.map((comment, i) => (
          <div
            key={comment.id}
            className={`${
              comments.length - 1 !== i && `px-3`
            } text-sm mt-2 w-full overflow-hidden`}
          >
            <div
              className={`${
                comments.length - 1 === i && `px-3`
              } border-b-2 dark:border-b-gray-800`}
            >
              <p className="text-gray-500 dark:text-gray-300 items-center mb-1 hover:underline cursor-pointer">
                Comentario en {comment?.data().title}
              </p>
              <p className="mb-2">
                {comment?.data().comment.length > 98 ? (
                  <>{comment.data().comment.substring(0, 98)}...</>
                ) : (
                  <>{comment.data().comment}</>
                )}
              </p>
            </div>
          </div>
        ))
      )}
      {noComments && (
        <p className="text-gray-400 text-sm border-b-2 w-full text-center px-2 mt-1">
          No hay comentarios
        </p>
      )}
    </div>
  );
};

export default AsideActivityComments;
