import FormComment from '../Forms/FormComment';
import Comment from './Comment';

const CommentsList = ({ id, title, comments }) => {
  return (
    <div className="mb-3">
      <FormComment id={id} title={title} />

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          avatar={comment.data().avatar}
          comment={comment.data().comment}
          timestamp={comment.data().timestamp}
          userId={comment.data().userId}
          username={comment.data().username}
        />
      ))}
    </div>
  );
};

export default CommentsList;
