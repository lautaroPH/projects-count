const SkeletonLoaderLink = () => {
  return (
    <div className="grid md:grid-cols-2 sm:mx-auto md:max-w-3xl xl:max-w-6xl mx-2">
      <div
        className="animate-pulse h-48 flex m-2  border-2 border-gray-300 rounded-xl 
    shadow-md space-x-2 bg-gray-200 p-2 dark:border-gray-800 dark:bg-[#3b3b3b]"
      >
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 w-24 bg-slate-400 dark:bg-slate-600 rounded"></div>
          <div className="h-6 w-44 bg-slate-400 dark:bg-slate-600 rounded"></div>
          <div className="space-y-3">
            <div className="h-5 mb-5 w-4/5 bg-slate-400 dark:bg-slate-600 rounded col-span-2"></div>
            <div className="h-3 w-5/6 bg-slate-400 dark:bg-slate-600 rounded"></div>
            <div className="flex justify-end ">
              <div className=" h-7 w-7 bg-slate-400 dark:bg-slate-600 rounded-full mr-3"></div>
              <div className=" h-7 w-7 bg-slate-400 dark:bg-slate-600 rounded-full ml-1"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="animate-pulse h-48 flex m-2  border-2 border-gray-300 rounded-xl 
    shadow-md space-x-2 bg-gray-200 p-2 dark:border-gray-800 dark:bg-[#3b3b3b]"
      >
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 w-24 bg-slate-400 dark:bg-slate-600 rounded"></div>
          <div className="h-6 w-44 bg-slate-400 dark:bg-slate-600 rounded"></div>
          <div className="space-y-3">
            <div className="h-5 mb-5 w-4/5 bg-slate-400 dark:bg-slate-600 rounded col-span-2"></div>
            <div className="h-3 w-5/6 bg-slate-400 dark:bg-slate-600 rounded"></div>
            <div className="flex justify-end ">
              <div className=" h-7 w-7 bg-slate-400 dark:bg-slate-600 rounded-full mr-3"></div>
              <div className=" h-7 w-7 bg-slate-400 dark:bg-slate-600 rounded-full ml-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoaderLink;
