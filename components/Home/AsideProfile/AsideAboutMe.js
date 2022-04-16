import useUser from "hooks/useUser";
import AsideActivity from "./AsideActivity";
import Profession from "./Profession";
import AboutMe from "./AboutMe";
import { useState, useEffect } from "react";
import { getUserOnSpanshot } from "firebaseFunction/getUserOnSpanshot";
import ModalUserForm from "components/Modals/ModalUserForm";

const AsideAboutMe = () => {
  const user = useUser();
  const [userProfile, setUserProfile] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  useEffect(
    () => user?.id && getUserOnSpanshot(user?.id, setUserProfile),
    [user?.id]
  );

  return (
    <div>
      {user && (
        <>
          <div className="flex justify-end w-full ">
            <div className="w-[75%]">
              <div className="w-full px-2 bg-white dark:bg-gray-900 rounded-xl">
                <div className="flex flex-col items-center p-2 border-b-2 dark:border-b-gray-800">
                  <h2 className="text-xl text-center text-violet-700 dark:text-white">
                    Mi perfil
                  </h2>
                  <div className="mt-2 text-center">
                    <h4 className="text-lg font-semibold">{user?.username}</h4>
                  </div>
                  <Profession profession={userProfile?.profession} />
                </div>
                <AboutMe aboutMe={userProfile?.aboutMe} />
                <button
                  onClick={() => setOpenForm(true)}
                  className="w-full pt-4 pb-2 text-sm text-center text-violet-600 dark:text-white hover:underline"
                >
                  Editar perfil
                </button>
              </div>
            </div>
          </div>

          <AsideActivity />
          {openForm && (
            <ModalUserForm
              userId={user?.id}
              openForm={openForm}
              setOpenForm={setOpenForm}
              aboutMe={userProfile?.aboutMe}
              profession={userProfile?.profession}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AsideAboutMe;
