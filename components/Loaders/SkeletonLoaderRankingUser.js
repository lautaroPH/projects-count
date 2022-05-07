const SkeletonLoaderRankingUser = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center w-full">
        <div className="py-1 mr-4 rounded-full w-9 h-9 bg-slate-400 dark:bg-slate-700"></div>
        <div className="h-6 w-[35%] bg-slate-400 dark:bg-slate-700 space-y-6 py-1 rounded"></div>
      </div>
      <div className="flex items-center justify-end w-full">
        <div className="h-6 w-[14%]  mr-16 sm:mr-20 bg-slate-400 dark:bg-slate-700 space-y-6 py-1 rounded"></div>
        <div className="h-6 w-[10%] mr-4 bg-slate-400 dark:bg-slate-700 space-y-6 py-1 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoaderRankingUser;
