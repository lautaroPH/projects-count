import Lottie from 'lottie-react';
import Buttons from './Buttons';
import persontAnimation from 'lottie/drawkit-grape-animation-4-LOOP.json';

const HomeDescription = () => {
  return (
    <div className="mt-6 sm:mt-0 flex flex-col xl:flex-row justify-center items-center h-screen">
      <div className="flex-1 xl:ml-10">
        <p className="mt-4 px-6 font-semibold text-violet-600 dark:text-gray-100 text-3xl sm:text-4xl sm:mt-20 sm:px-12 md:px-20 lg:mt-10 lg:mb-2 lg:text-center xl:text-left">
          Compartí tus proyectos, interactua con otros programadores y aprende
          en el proceso
        </p>
        <div className="sm:w-full sm:flex sm:justify-center sm:items-center sm:text-center">
          <div className="-mt-12 sm:w-[80%] md:w-[60%] lg:-mt-20 xl:hidden">
            <Lottie
              loop={true}
              autoplay={true}
              animationData={persontAnimation}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Buttons />
        </div>
        <div className="flex justify-center items-center text-center mt-6">
          <p className="w-[90%]">
            Aclaración: al entrar como invitado no vas a poder realizar
            publicaciones ni comentar.
          </p>
        </div>
      </div>
      <div className="flex-1 xl:-mt-24 xl:mx-40 hidden xl:flex">
        <Lottie loop={true} autoplay={true} animationData={persontAnimation} />
      </div>
    </div>
  );
};

export default HomeDescription;
