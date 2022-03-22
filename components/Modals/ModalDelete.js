import { Dialog, Transition } from '@headlessui/react';
import ButtonDeleteDefinitive from 'components/Home/ButtonDeleteDefinitive';
import { Fragment } from 'react';

const ModalDelete = ({
  openDeleteModal,
  setDeleteModal,
  title,
  id,
  setDocumentDeleted,
}) => {
  return (
    <Transition.Root show={openDeleteModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10  inset-0 overflow-y-auto"
        onClose={setDeleteModal}
      >
        <div
          className="flex items-center justify-center min-h-[800px] 
            sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-200"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className="fixed inset-0 bg-gray-600 
              bg-opacity-75 transition-opacity"
            />
          </Transition.Child>
          <span
            className="hidden sm:inline-block 
              sm:align-middle sm:h-screen"
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
            <div
              className="inline-block align-bottom bg-white dark:bg-gray-dark rounded-lg 
                px-4 pt-5 pb-4  text-left overflow-hidden shadow-xl transform 
                transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <Dialog.Title className="text-center text-black dark:text-gray-100">
                {title}
              </Dialog.Title>
              <div className="flex justify-evenly mt-4">
                <button
                  className="rounded-md border border-transparent shadow-sm px-4 py-2 
                  bg-gray-600 text-base font-medium text-white transition-colors ease-in-out
                  duration-150 hover:bg-gray-700 sm:text-sm "
                  onClick={() => {
                    setDeleteModal(false);
                  }}
                >
                  Cancelar
                </button>
                <ButtonDeleteDefinitive
                  id={id}
                  setDocumentDeleted={setDocumentDeleted}
                />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalDelete;
