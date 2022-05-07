import Linklist from 'components/Home/Main/Link';
import SkeletonLoaderLink from 'components/Loaders/SkeletonLoaderLink';

const UserListLinks = ({ userLinks, loading, empty, setUserLinks }) => {
  return (
    <article className="flex flex-col items-center justify-center w-full ">
      <h2 className="w-full py-4 text-xl text-center bg-white border-b border-gray-300 text-violet-700">
        Actividad
      </h2>
      <div className="w-full ">
        <div className="mb-20">
          <>
            {loading ? (
              <>
                <SkeletonLoaderLink />
                <SkeletonLoaderLink />
              </>
            ) : (
              userLinks.map((link) => (
                <Linklist
                  id={link?.id}
                  key={link?.id}
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
              <h3 className="font-semibold text-center text-gray-700">
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
