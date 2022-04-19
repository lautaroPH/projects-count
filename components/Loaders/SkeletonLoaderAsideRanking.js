const SkeletonLoaderAsideRanking = () => {
  return (
    <div className="w-full mt-3 animate-pulse">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center w-full">
          <div className="mr-2 rounded-full w-9 h-9 bg-slate-400 dark:bg-slate-700"></div>
          <div className="w-3/5 h-4 mb-2 mr-1 rounded bg-slate-400 dark:bg-gray-700"></div>
        </div>
        <div className="w-4 h-4 mb-2 rounded bg-slate-400 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default SkeletonLoaderAsideRanking;
