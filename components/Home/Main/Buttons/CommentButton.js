import { ChatIcon } from '@heroicons/react/outline';
import useUser from 'hooks/useUser';
import { useTheme } from 'next-themes';
import { swalUserNotLoggedDark } from 'swals/dark/swalUserNotLoggedDark';
import { swalUserNotLoggedLight } from 'swals/light/swalUserNotLoggedLight';

const CommentButton = ({ setOpenCommentModal, openCommentModal }) => {
  const user = useUser();
  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const openModalForm = () => {
    openCommentModal ? setOpenCommentModal(false) : setOpenCommentModal(true);
  };

  return (
    <>
      <button
        onClick={
          user
            ? openModalForm
            : currentTheme === 'dark'
            ? swalUserNotLoggedDark
            : swalUserNotLoggedLight
        }
        className="flex text-purple-700 dark:text-white items-center hover:bg-gray-200 dark:hover:bg-[#282C34] p-2 rounded transition-all ease-in-out duration-300"
      >
        <ChatIcon className="h-6 mr-1" />{' '}
        <span className="hidden sm:block md:hidden lg:block">Comentar</span>
      </button>
    </>
  );
};

export default CommentButton;
