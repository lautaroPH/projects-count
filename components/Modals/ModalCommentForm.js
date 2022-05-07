import { Dialog, Transition } from '@headlessui/react';
import FormComment from 'components/Home/Main/Forms/FormComment';
import LinkDataCommentModal from 'components/Home/Main/LinkDataCommentModal';
import { Fragment } from 'react';

const ModalCommentForm = ({
  openForm,
  setOpenForm,
  linkId,
  title,
  commentsNumber,
  comments,
  setComments,
  links,
  setLinks,
  setCommentsNumber,
  isOneLink,
  avatar,
  username,
  createdAtFormated,
  timeago,
  description,
  setOpenComments,
}) => {
  return (
    <Transition.Root show={openForm} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto"
        onClose={setOpenForm}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-200"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-200 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full max-w-lg px-2 pt-2 pb-2 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:my-8 sm:align-middle">
              <LinkDataCommentModal
                avatar={avatar}
                username={username}
                createdAtFormated={createdAtFormated}
                timeago={timeago}
                title={title}
                description={description}
              />

              <FormComment
                setOpenForm={setOpenForm}
                setOpenComments={setOpenComments}
                isEditing={false}
                linkId={linkId}
                title={title}
                commentsNumber={commentsNumber}
                comments={comments}
                setComments={setComments}
                links={links}
                setLinks={setLinks}
                setCommentsNumber={setCommentsNumber}
                isOneLink={isOneLink}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalCommentForm;
