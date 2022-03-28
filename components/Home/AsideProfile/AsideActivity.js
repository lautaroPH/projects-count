import AsideActivityComments from './AsideActivityComments';

const AsideActivity = () => {
  return (
    <div className="flex justify-end mt-2">
      <div className="flex flex-col bg-white dark:bg-gray-900 w-[75%] justify-center items-center p-2">
        <div className="flex flex-col justify-center items-center border-b-2 dark:border-b-gray-800 w-full pb-2">
          <h4 className="text-violet-700 dark:text-white text-lg">Actividad</h4>
          {/* <p className="text-gray-400 text-sm">
        No hay actividad para mostrar
      </p> */}
        </div>
        <AsideActivityComments />
        <div>
          <h5 className="text-base font-semibold">Te gustó</h5>
        </div>
      </div>
    </div>
  );
};

export default AsideActivity;
