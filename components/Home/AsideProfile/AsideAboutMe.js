import useUser from 'hooks/useUser';
import Image from 'next/image';
import AsideActivity from './AsideActivity';
const AsideAboutMe = () => {
  const user = useUser();
  return (
    <div>
      <div className="flex justify-end w-full">
        <div className="">
          <div className="flex bg-white dark:bg-gray-900 w-full">
            <div className="flex flex-col items-center p-2">
              <h2 className="text-violet-700 dark:text-white text-xl">
                Mi perfil
              </h2>
              <div className="flex">
                <div className="h-16 w-16">
                  {user?.avatar && (
                    <Image
                      src={user?.avatar}
                      alt={user?.username}
                      width={150}
                      height={150}
                      className="rounded-full"
                    />
                  )}
                </div>
                <h4 className="">{user?.username}</h4>
              </div>
              <p>Sobre mi</p>
            </div>
          </div>
        </div>
      </div>

      <AsideActivity />
    </div>
  );
};

export default AsideAboutMe;
