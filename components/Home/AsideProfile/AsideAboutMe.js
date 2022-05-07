import ModalUserForm from 'components/Modals/ModalUserForm';
import AboutMe from './AboutMe';
import Profession from './Profession';
import { useState } from 'react';

const AsideAboutMe = ({ username, profession, aboutMe, id, userId }) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="flex justify-end w-full ">
      <div className="w-[90%] xl:w-[80%]">
        <div className="w-full px-2 bg-white dark:bg-gray-900 rounded-xl">
          <div className="flex flex-col items-center p-2 border-b-2 dark:border-b-gray-800">
            <h2 className="text-xl text-center text-violet-700 dark:text-white">
              Mi perfil
            </h2>
            <div className="mt-2 text-center">
              <h4 className="text-lg font-semibold">{username}</h4>
            </div>
            <Profession profession={profession} />
          </div>
          <AboutMe aboutMe={aboutMe} />
          {userId === id && (
            <button
              onClick={() => setOpenForm(true)}
              className="w-full pb-2 text-sm text-center text-violet-600 dark:text-white hover:underline"
            >
              Editar perfil
            </button>
          )}
        </div>
      </div>
      {openForm && (
        <ModalUserForm
          userId={id}
          openForm={openForm}
          setOpenForm={setOpenForm}
          aboutMe={aboutMe}
          profession={profession}
        />
      )}
    </div>
  );
};

export default AsideAboutMe;
