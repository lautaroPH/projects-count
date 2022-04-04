import AsideActivityComments from './AsideActivityComments';
import AsideActivityLikes from './AsideActivityLikes';

const AsideActivity = () => {
  return (
    <div className="flex justify-end mt-2">
      <div className="flex flex-col bg-white dark:bg-gray-900 w-[75%] justify-center items-center px-2">
        {/* <p className="text-sm text-gray-400">
        No hay actividad para mostrar
      </p> */}
        <AsideActivityComments />
        <AsideActivityLikes />
      </div>
    </div>
  );
};

export default AsideActivity;
