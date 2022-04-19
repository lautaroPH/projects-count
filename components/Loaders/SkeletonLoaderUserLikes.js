const SkeletonLoaderUserLikes = () => {
  return (
    <div className="w-full mt-2 animate-pulse">
      <div className="flex">
        <div className="w-10 h-10 mr-2 rounded-full bg-slate-400 dark:bg-slate-700"></div>
        <div className="w-[70%]">
          <div className="w-12 h-4 mb-3 rounded sm:w-24 bg-slate-400 dark:bg-gray-700"></div>
          <div className="w-full h-8 mb-2 mr-1 rounded bg-slate-400 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoaderUserLikes;
