import { CodeIcon, ExternalLinkIcon } from '@heroicons/react/outline';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';

const AllButtons = ({
  id,
  likes,
  githubRepo,
  link,
  setOpenCommentInput,
  openCommentInput,
  dataUserLike,
}) => {
  return (
    <div className="flex justify-evenly sm:justify-around items-center h-auto my-1">
      <LikeButton id={id} likes={likes} dataUserLike={dataUserLike} />
      <CommentButton
        setOpenCommentInput={setOpenCommentInput}
        openCommentInput={openCommentInput}
      />
      <a href={link} target="_blank" rel="noreferrer">
        <button className="flex text-purple-700 items-center dark:text-white hover:bg-gray-200 dark:hover:bg-[#282C34] p-2 rounded transition-all ease-in-out duration-300">
          <ExternalLinkIcon className="h-6 mr-1" />{' '}
          <span className="hidden sm:block">Visitar</span>
        </button>
      </a>
      {githubRepo && (
        <a href={githubRepo} target="_blank" rel="noreferrer">
          <button className="flex text-purple-700 items-center dark:text-white hover:bg-gray-200 dark:hover:bg-[#282C34] p-2 rounded transition-all ease-in-out duration-300">
            <CodeIcon className="h-6 mr-1" />{' '}
            <span className="hidden sm:block">Repositorio</span>
          </button>
        </a>
      )}
    </div>
  );
};

export default AllButtons;
