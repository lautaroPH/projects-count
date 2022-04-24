import Link from 'next/link';

const UserComment = ({ id, linkId, commentLength, i, title, comment }) => {
  return (
    <div
      key={id}
      className={`${
        commentLength - 1 !== i && `px-3`
      } mt-2 w-full overflow-hidden`}
    >
      <div
        className={`${
          commentLength - 1 === i && `px-3`
        } border-b-2 dark:border-b-gray-800`}
      >
        <Link passHref href={`/link/${linkId}`}>
          <a className="items-center mb-1 text-[13px] text-gray-500 cursor-pointer dark:text-gray-300 hover:underline">
            Comentario en {title}
          </a>
        </Link>
        <p className="mb-2">
          {comment.length > 98 ? (
            <>{comment.substring(0, 98)}...</>
          ) : (
            <>{comment}</>
          )}
        </p>
      </div>
    </div>
  );
};

export default UserComment;
