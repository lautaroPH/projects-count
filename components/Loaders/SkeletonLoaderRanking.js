import SkeletonLoaderRankingUser from './SkeletonLoaderRankingUser';

const SkeletonLoaderRanking = () => {
  return (
    <div className="px-4 pt-4 pb-20">
      <div className="flex justify-center">
        <div className="w-full overflow-hidden rounded-lg table-auto max-w-prose">
          <div className="flex p-2 m-2 space-x-2 bg-white border-2 border-gray-100 shadow-md animate-pulse h-68 rounded-xl dark:bg-gray-900 dark:border-gray-800">
            <div className="flex-1 py-1 space-y-6">
              <div className="flex justify-between">
                <div className="h-4 w-[18%] ml-5  bg-slate-400 dark:bg-slate-700 space-y-6 py-1 rounded"></div>
                <div className="flex justify-end w-full">
                  <div className="h-4 w-[23%]  bg-slate-400 dark:bg-slate-700 mr-10  space-y-6 py-1 rounded"></div>
                  <div className="h-4 w-[10%] bg-slate-400 dark:bg-slate-700 space-y-6 py-1 rounded mr-2"></div>
                </div>
              </div>

              <SkeletonLoaderRankingUser />
              <SkeletonLoaderRankingUser />
              <SkeletonLoaderRankingUser />
              <SkeletonLoaderRankingUser />
              <SkeletonLoaderRankingUser />
              <SkeletonLoaderRankingUser />
              <SkeletonLoaderRankingUser />
              <SkeletonLoaderRankingUser />
              <SkeletonLoaderRankingUser />
              <SkeletonLoaderRankingUser />
              <SkeletonLoaderRankingUser />
              <SkeletonLoaderRankingUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoaderRanking;
