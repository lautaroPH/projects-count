import useUser from 'hooks/useUser';
import { PencilAltIcon, PencilIcon } from '@heroicons/react/outline';
import { useState, useRef, useEffect } from 'react';
import ModalUserForm from 'components/Modals/ModalUserForm';
import { imageValidation } from 'utils/ImageValidation';
import { uploadBanner } from 'firebaseFunction/UploadBanner';
import Swal from 'sweetalert2';

const UserProfile = ({
  userId,
  avatar,
  username,
  profession,
  aboutMe,
  portfolio,
  banner,
}) => {
  const user = useUser();
  const [openForm, setOpenForm] = useState(false);
  const imageRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorFileExtension, setErrorFileExtension] = useState('');
  const [erroFileSize, setErroFileSize] = useState('');

  const uploadFile = (e) => {
    imageValidation(e, setErrorFileExtension, setErroFileSize, setSelectedFile);
  };

  useEffect(() => {
    if (selectedFile && user?.id === userId) {
      uploadBanner(selectedFile, user?.id);
    }
  }, [selectedFile, user, userId]);

  useEffect(() => {
    if (erroFileSize || errorFileExtension) {
      Swal.fire({
        title: 'Error',
        text: `${erroFileSize} ${errorFileExtension}`,
        icon: 'error',
      });
    }
  }, [erroFileSize, errorFileExtension]);

  return (
    <article className="pb-3 overflow-hidden bg-white dark:bg-gray-900 lg:rounded-t-xl">
      <div className="relative h-40 sm:h-52 md:h-64">
        <img
          src={selectedFile ? selectedFile : banner}
          alt="Portada"
          className="object-cover w-full h-full"
        />
        {userId === user?.id && (
          <>
            <button
              onClick={() => imageRef.current.click()}
              className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 p-1 mt-3 mr-3 text-white transition-all duration-200 ease-in-out border rounded-full border-violet-600 dark:border-white dark:text-black dark:bg-white dark:hover:text-white dark:hover:bg-transparent hover:text-violet-600 bg-violet-600 hover:bg-transparent"
            >
              <PencilAltIcon className="w-5 h-5 " />
            </button>
            <div>
              <input ref={imageRef} type="file" hidden onChange={uploadFile} />
            </div>
          </>
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
            <button
              onClick={() => setOpenForm(true)}
              className="flex items-center justify-center w-8 h-8 mt-3 transition-all duration-200 ease-in-out rounded-full hover:bg-gray-300 dark:hover:bg-gray-800"
            >
              <PencilIcon className="w-6 h-6 text-violet-600 dark:text-white" />
            </button>
          )}
        </div>
        <div>
          <h3 className="mt-1 text-xl font-semibold">{username}</h3>
          <h5 className="text-gray-400">{profession}</h5>
          <a
            href={portfolio}
            className="text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            {portfolio}
          </a>
          <p className="mt-3 sm:w-[70ch] xl:w-[60ch]">{aboutMe}</p>
        </div>
      </div>
      {openForm && (
        <ModalUserForm
          userId={userId}
          openForm={openForm}
          setOpenForm={setOpenForm}
          aboutMe={aboutMe}
          profession={profession}
          portfolio={portfolio}
        />
      )}
    </article>
  );
};

export default UserProfile;
