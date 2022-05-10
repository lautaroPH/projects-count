import SkeletonLoaderUserLinksImages from 'components/Loaders/SkeletonLoaderUserLinksImages';
import UserLastLinkImage from './UserLastLinkImage';

const UserLastsLinks = ({ userLinks, loading }) => {
  return (
    <>
      {loading ? (
        <SkeletonLoaderUserLinksImages />
      ) : (
        <article
          className={`${
            userLinks.length === 1
              ? 'grid-rows-[125px]'
              : 'grid-rows-[125px_125px]'
          } grid auto-cols-fr grid-flow-col gap-[2px] shadow border border-gray-400 dark:border-gray-700 auto-rows-[110px] mt-7 xl:mr-0 lg:mr-7 rounded-xl overflow-hidden`}
        >
          {userLinks.map((link, index) => (
            <UserLastLinkImage
              key={link?.id}
              index={index}
              linkLength={userLinks.length}
              image={link?.data()?.image}
              linkId={link?.id}
            />
          ))}
        </article>
      )}
    </>
  );
};

export default UserLastsLinks;
