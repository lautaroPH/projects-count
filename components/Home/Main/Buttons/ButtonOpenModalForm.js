import { PlusCircleIcon } from '@heroicons/react/solid';
import ModalForm from 'components/Modals/ModalForm';
import { useState } from 'react';

const ButtonOpenModalForm = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center mb-7">
        <div className="fixed bottom-0 right-0 py-[3.25rem] px-1 z-20 sm:p-3 lg:relative lg:flex lg:justify-between lg:items-center lg:bg-white lg:dark:bg-gray-900 lg:w-full xl:w-full lg:p-4 lg:rounded-lg">
          <button
            onClick={() => setOpenForm(true)}
            className="hidden lg:flex justify-start w-full border border-gray-400 dark:border-gray-500 rounded-full p-3
                cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-200 dark:hover:bg-[#282C34]"
          >
            Crear publicación
          </button>
          <PlusCircleIcon
            className="transition-all duration-200 ease-in-out cursor-pointer h-14 w-14 lg:ml-3 text-violet-800 dark:text-white hover:text-violet-900 dark:hover:text-gray-300"
            onClick={() => setOpenForm(true)}
          />
        </div>
      </div>
      {openForm && (
        <ModalForm
          openForm={openForm}
          setOpenForm={setOpenForm}
          isEdited={false}
        />
      )}
    </>
  );
};

export default ButtonOpenModalForm;
