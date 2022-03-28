import { Dialog, Transition } from '@headlessui/react';
import FormLink from 'components/Home/Main/Forms/FormLink';
import { Fragment } from 'react';

const ModalForm = ({ openForm, setOpenForm }) => {
  return (
    <Transition.Root show={openForm} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-30  inset-0 overflow-y-auto"
        onClose={setOpenForm}
      >
        <div
          className="flex items-center justify-center 
        min-h-screen pt-4 px-4 pb-20 text-center"
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
              className="inline-block align-bottom dark:bg-gray-dark bg-white rounded-lg 
                px-4 pt-5 pb-4  text-left overflow-hidden shadow-xl transform 
                transition-all sm:my-8 sm:align-middle max-w-lg w-full"
            >
              <FormLink setOpenForm={setOpenForm} />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalForm;
