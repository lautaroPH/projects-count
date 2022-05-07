import useUser from 'hooks/useUser';
import { PencilAltIcon, PencilIcon } from '@heroicons/react/outline';

const UserProfile = ({ userId, avatar, username, profession, aboutMe }) => {
  const user = useUser();
  return (
    <article className="bg-white">
      <div className="relative h-40 sm:h-52 md:h-64">
        <img
          src="http://via.placeholder.com/840x250"
          alt="Portada"
          className="object-cover w-full h-full"
        />
        {userId === user?.id && (
          <button className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 p-1 mt-3 mr-3 text-white transition-all duration-200 ease-in-out rounded-full hover:text-violet-600 bg-violet-600 hover:bg-white">
            <PencilAltIcon className="w-5 h-5 " />
          </button>
        )}
      </div>
      <div className="relative z-10 px-3">
        <div className="flex justify-between">
          <figure className="w-24 h-24 -mt-12 sm:w-28 sm:h-28">
            <img
              className="w-24 h-24 rounded-full sm:w-28 sm:h-28"
              src={avatar}
              alt="Avatar"
            />
          </figure>
          {userId === user?.id && (
            <button className="flex items-center justify-center w-8 h-8 mt-3 transition-all duration-200 ease-in-out rounded-full hover:bg-gray-300">
              <PencilIcon className="w-6 h-6 text-violet-600 " />
            </button>
          )}
        </div>
        <div>
          <h3 className="mt-1 text-xl font-semibold">{username}</h3>
          <h5 className="text-gray-400">{profession}</h5>
          <a
            href="https://lautaroph.github.io/Portfolio/"
            className="text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            https://lautaroph.github.io/Portfolio/
          </a>
          <p className="mt-3 sm:w-[70ch] xl:w-[60ch]">{aboutMe}</p>
        </div>
      </div>
    </article>
  );
};

export default UserProfile;
