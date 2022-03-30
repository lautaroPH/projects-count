import { getMoreComments } from 'firebaseFunction/getMoreComments';
import useUser from 'hooks/useUser';
import FormComment from '../Forms/FormComment';
import Comment from './Comment';

const CommentsList = ({ id, title, comments, setComments }) => {
  const user = useUser();
  const handleLoadMoreComments = () => {
    if (comments.length > 0) {
      const lastComment = comments[comments.length - 1];

      getMoreComments(id, lastComment, setComments);
    }
  };
  return (
    <div className="mb-3">
      {user && <FormComment id={id} title={title} />}

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          linkId={id}
          commentId={comment.id}
          avatar={comment.data().avatar}
          comment={comment.data().comment}
          timestamp={comment.data().timestamp}
          userId={comment.data().userId}
          username={comment.data().username}
        />
      ))}
      <button onClick={handleLoadMoreComments}>Mostrar mas comentarios</button>
    </div>
  );
};

export default CommentsList;
