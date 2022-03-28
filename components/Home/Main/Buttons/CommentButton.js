import { ChatIcon } from '@heroicons/react/outline';

const CommentButton = ({ setOpenCommentInput, openCommentInput }) => {
  return (
    <>
      <button
        onClick={() => {
          openCommentInput
            ? setOpenCommentInput(false)
            : setOpenCommentInput(true);
        }}
        className="flex text-purple-700 dark:text-white items-center hover:bg-gray-200 dark:hover:bg-[#282C34] p-2 rounded transition-all ease-in-out duration-300"
      >
        <ChatIcon className="h-6 mr-1" />{' '}
        <span className="hidden sm:block">Comentar</span>
      </button>
    </>
  );
};

export default CommentButton;
