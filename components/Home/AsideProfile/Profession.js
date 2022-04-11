import { XIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import FormProfession from './FormProfession';

const Profession = ({ profession, userId }) => {
  const [openEditProfession, setOpenEditProfession] = useState(false);

  return (
    <div className="relative flex items-center justify-center w-full">
      {!openEditProfession ? (
        <>
          <p className="mr-2 text-gray-500 dark:text-gray-300">
            {profession ? profession : 'Profesion'}
          </p>
          <button
            onClick={() => setOpenEditProfession(true)}
            className="cursor-pointer text-violet-600 dark:text-white hover:underline"
          >
            Editar
          </button>
        </>
      ) : (
        <>
          <FormProfession
            profession={profession}
            userId={userId}
            setOpenEditProfession={setOpenEditProfession}
          />
          <button
            onClick={() => setOpenEditProfession(false)}
            className="absolute top-0.5 -right-3"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

export default Profession;
