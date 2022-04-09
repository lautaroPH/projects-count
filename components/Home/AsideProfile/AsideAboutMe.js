import useUser from 'hooks/useUser';
import AsideActivity from './AsideActivity';

const AsideAboutMe = () => {
  const user = useUser();
  return (
    <div>
      {user && (
        <>
          <div className="flex justify-end w-full ">
            <div className="w-[75%]">
              <div className="w-full px-2 bg-white dark:bg-gray-900">
                <div className="flex flex-col items-center p-2 border-b-2 dark:border-b-gray-800">
                  <h2 className="text-xl text-center text-violet-700 dark:text-white">
                    Mi perfil
                  </h2>
                  <div className="mt-2 text-center">
                    <h4 className="text-lg font-semibold">{user?.username}</h4>
                  </div>
                  <div className="flex cursor-pointer">
                    {/* <p className="mr-2 text-gray-500">Profesion</p> */}
                    <p className="mr-2 text-gray-500 dark:text-gray-300">
                      Frontend
                    </p>
                    <button className="text-violet-600 dark:text-white hover:underline">
                      Editar
                    </button>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <h2 className="text-violet-600 mb-[2px] font-semibold text-center dark:text-white">
                    Sobre mi
                  </h2>
                  {/* <p className="pb-2 text-sm text-center">
                orem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essent
              </p> */}
                  <button className="w-full pb-2 text-sm text-center text-gray-900 dark:text-white hover:underline">
                    Crear sobre mi
                  </button>
                </div>
              </div>
            </div>
          </div>

          <AsideActivity />
        </>
      )}
    </div>
  );
};

export default AsideAboutMe;
