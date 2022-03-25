import SkeletonLoaderButtonsLinks from './SkeletonLoaderButtonsLinks';

const SkeletonLoaderLink = () => {
  return (
    <div
      className="overflow-hidden my-2 w-full border-gray-100 sm:rounded-xl 
      bg-white mb-2 dark:border-gray-800 dark:bg-gray-900 animate-pulse h-auto flex
    shadow-md"
    >
      <div className="flex-1">
        <div className="flex pt-3 pl-3 items-center">
          <div className="h-14 w-14 bg-slate-400 dark:bg-slate-700 rounded-full"></div>
          <div className="ml-2">
            <div className="h-5 w-40 bg-slate-400 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-3 w-28 bg-slate-400 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="pl-4 mt-2">
          <div className="h-5 w-32 bg-slate-400 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-24 w-[96%] bg-slate-400 dark:bg-gray-700 rounded mb-2"></div>
          <div className="flex my-3">
            <div className="h-8 w-20 bg-slate-400 dark:bg-gray-700 rounded-full mr-1"></div>
            <div className="h-8 w-20 bg-slate-400 dark:bg-gray-700 rounded-full mr-1"></div>
            <div className="h-8 w-20 bg-slate-400 dark:bg-gray-700 rounded-full mr-1"></div>
            <div className="hidden sm:block h-8 w-20 bg-slate-400 dark:bg-gray-700 rounded-full mr-1"></div>
            <div className="hidden sm:block h-8 w-20 bg-slate-400 dark:bg-gray-700 rounded-full mr-1"></div>
          </div>
        </div>
        <div className="h-40 sm:h-72 w-full">
          <div className="h-full w-full bg-slate-400 dark:bg-gray-700"></div>
        </div>
        <SkeletonLoaderButtonsLinks />
      </div>
    </div>
  );
};

export default SkeletonLoaderLink;
