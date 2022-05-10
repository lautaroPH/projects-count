import Linklist from 'components/Home/Main/Link';
import SkeletonLoaderLink from 'components/Loaders/SkeletonLoaderLink';
import OrderUsersLinks from './OrderUserLinks';

const UserListLinks = ({ userLinks, loading, empty, setUserLinks }) => {
  return (
    <article className="flex flex-col items-center justify-center w-full">
      <div className="relative flex items-center w-full pt-1 pb-4 bg-white border-b border-gray-300 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="w-full text-xl text-center dark:text-white text-violet-700">
          Actividad
        </h2>
        <OrderUsersLinks />
      </div>
      <div className="w-full ">
        <div className="mb-20">
          <>
            {loading ? (
              <>
                <SkeletonLoaderLink />
                <SkeletonLoaderLink />
              </>
            ) : (
              userLinks.map((link, i) => (
                <Linklist
                  id={link?.id}
                  key={link?.id}
                  index={i}
                  title={link?.data()?.title}
                  link={link?.data()?.link}
                  description={link?.data()?.description}
                  email={link?.data()?.email}
                  userId={link?.data()?.id}
                  username={link?.data()?.username}
                  githubRepo={link?.data()?.githubRepo}
                  tecnologies={link?.data()?.tecnologies}
                  image={link?.data()?.image}
                  avatar={link?.data()?.userImage}
                  timestamp={link?.data()?.timestamp?.seconds * 1000}
                  isEdited={link?.data()?.isEdited}
                  isUser={true}
                  links={userLinks}
                  setLinks={setUserLinks}
                />
              ))
            )}
            {empty && (
              <h3 className="w-full py-1 font-semibold text-center text-gray-700 bg-white border-b border-gray-300 dark:border-gray-800 dark:text-white dark:bg-gray-900">
                No hay publicaciones
              </h3>
            )}
          </>
        </div>
      </div>
    </article>
  );
};

export default UserListLinks;
