import SkeletonLoaderButtonsLinks from './SkeletonLoaderButtonsLinks';

const SkeletonLoaderLink = () => {
  return (
    <div
      className="flex w-full h-auto mb-2 overflow-hidden bg-white border-gray-100 shadow-md sm:rounded-xl dark:border-gray-800 dark:bg-gray-900 animate-pulse"
    >
      <div className="flex-1">
        <div className="flex items-center pt-3 pl-3">
          <div className="rounded-full h-14 w-14 bg-slate-400 dark:bg-slate-700"></div>
          <div className="ml-2">
            <div className="w-40 h-5 mb-2 rounded bg-slate-400 dark:bg-gray-700"></div>
            <div className="h-3 rounded w-28 bg-slate-400 dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="pl-4 mt-2">
          <div className="w-32 h-5 mb-4 rounded bg-slate-400 dark:bg-gray-700"></div>
          <div className="h-24 w-[96%] bg-slate-400 dark:bg-gray-700 rounded mb-2"></div>
          <div className="flex my-3">
            <div className="w-20 h-8 mr-1 rounded-full bg-slate-400 dark:bg-gray-700"></div>
            <div className="w-20 h-8 mr-1 rounded-full bg-slate-400 dark:bg-gray-700"></div>
            <div className="w-20 h-8 mr-1 rounded-full bg-slate-400 dark:bg-gray-700"></div>
            <div className="hidden w-20 h-8 mr-1 rounded-full sm:block bg-slate-400 dark:bg-gray-700"></div>
            <div className="hidden w-20 h-8 mr-1 rounded-full sm:block bg-slate-400 dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="w-full h-40 sm:h-72">
          <div className="w-full h-full bg-slate-400 dark:bg-gray-700"></div>
        </div>
        <SkeletonLoaderButtonsLinks />
      </div>
    </div>
  );
};

export default SkeletonLoaderLink;
