const SkeletonLoaderComment = () => {
  return (
    <div className="flex w-full h-auto px-4 mt-2 mb-2 overflow-hidden bg-white border-gray-100 dark:border-gray-800 dark:bg-gray-900 animate-pulse">
      <div className="flex w-full">
        <div className="">
          <div className="w-8 h-8 mr-3 rounded-full md:w-11 md:h-11 bg-slate-300 dark:bg-slate-700"></div>
        </div>
        <div className="w-full">
          <div className="w-[98%] h-28 mb-2 p-2 rounded-lg bg-slate-300 dark:bg-gray-700">
            <div className="h-5 mb-1 rounded w-44 bg-slate-200 dark:bg-gray-600"></div>
            <div className="h-4 mb-3 rounded w-28 bg-slate-200 dark:bg-gray-600"></div>
            <div className="w-full h-10 rounded bg-slate-200 dark:bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoaderComment;
