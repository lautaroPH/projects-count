import UserLastLinkImage from './UserLastLinkImage';

const UserLastsLinks = ({ userLinks }) => {
  return (
    <>
      {userLinks.length > 0 && (
        <article
          className={`${
            userLinks.length === 1
              ? 'grid-rows-[110px]'
              : 'grid-rows-[110px_110px]'
          } grid auto-cols-fr grid-flow-col gap-[2px] shadow border border-gray-400 dark:border-gray-500 rounded-3xl auto-rows-[110px] mt-7 xl:mr-0 lg:mr-7`}
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
