import { CodeIcon, ExternalLinkIcon } from '@heroicons/react/outline';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';

const AllButtons = ({
  id,
  likes,
  githubRepo,
  link,
  setOpenCommentModal,
  openCommentModal,
  dataUserLike,
  links,
  setLinks,
  isOneLink,
}) => {
  return (
    <div className="flex items-center h-auto my-1 justify-evenly sm:justify-around">
      <LikeButton
        id={id}
        likes={likes}
        dataUserLike={dataUserLike}
        links={links}
        setLinks={setLinks}
        isOneLink={isOneLink}
      />
      <CommentButton
        setOpenCommentModal={setOpenCommentModal}
        openCommentModal={openCommentModal}
      />
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="flex text-purple-700 items-center dark:text-white hover:bg-gray-200 dark:hover:bg-[#282C34] p-2 rounded transition-all ease-in-out duration-300"
      >
        <ExternalLinkIcon className="h-6 mr-1" />{' '}
        <span className="hidden sm:block md:hidden lg:block">Visitar</span>
      </a>
      {githubRepo && (
        <a
          href={githubRepo}
          target="_blank"
          rel="noreferrer"
          className="flex text-purple-700 items-center dark:text-white hover:bg-gray-200 dark:hover:bg-[#282C34] p-2 rounded transition-all ease-in-out duration-300"
        >
          <CodeIcon className="h-6 mr-1" />{' '}
          <span className="hidden sm:block md:hidden lg:block">
            Repositorio
          </span>
        </a>
      )}
    </div>
  );
};

export default AllButtons;
