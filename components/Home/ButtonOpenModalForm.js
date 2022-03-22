import { PlusCircleIcon } from '@heroicons/react/solid';

const ButtonOpenModalForm = ({ setOpenForm }) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="fixed bottom-0 right-0 py-[3.25rem] px-1 z-50 sm:p-3 lg:relative lg:flex lg:justify-between lg:items-center lg:bg-white lg:dark:bg-gray-900 lg:w-[50%] xl:w-[38%] lg:p-4 lg:rounded-lg">
        <button
          onClick={() => setOpenForm(true)}
          className="hidden lg:flex justify-start w-full border border-gray-400 dark:border-gray-500 rounded-full p-3
                cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-200 dark:hover:bg-[#282C34]"
        >
          Crear publicación
        </button>
        <PlusCircleIcon
          className="h-14 w-14 lg:ml-3 text-violet-800 dark:text-white cursor-pointer hover:text-violet-900 dark:hover:text-gray-300 transition-all ease-in-out duration-200"
          onClick={() => setOpenForm(true)}
        />
      </div>
    </div>
  );
};

export default ButtonOpenModalForm;
