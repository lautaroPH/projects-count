import ModalDelete from 'components/Modals/ModalDelete';
import { useDateTimeFormat } from 'hooks/useDateTimeFormat';
import { useTimeAgo } from 'hooks/useTimeAgo';
import useUser from 'hooks/useUser';
import { useState, useEffect } from 'react';
import ButtonDelete from './ButtonDelete';
import LikeButton from './LikeButton';
import Image from 'next/image';
import { ChatIcon, CodeIcon, ExternalLinkIcon } from '@heroicons/react/outline';
import { db } from 'firebaseMain/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

//TODO: intentar hacer que se muestre quien le da like con las caritas

const LinkList = ({
  title,
  link,
  description,
  id,
  userId,
  timestamp,
  githubRepo,
  tecnologies,
  avatar,
  image,
  setDocumentDeleted,
  username,
}) => {
  const [likes, setLikes] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'links', id, 'likes'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setLikes(snapshot.docs)
      ),
    [id]
  );
  if (timestamp !== null) {
    const createdAt = new Date(parseInt(timestamp?.seconds * 1000));
  }

  const timeago = useTimeAgo(createdAt !== undefined && createdAt);
  const createdAtFormated = useDateTimeFormat(
    createdAt !== undefined && createdAt
  );
  const user = useUser();

  const titleWithUppercase = title.charAt(0).toUpperCase() + title.slice(1);
  const descriptionWithUppercase =
    description.charAt(0).toUpperCase() + description.slice(1);

  const tecnologiesArray = tecnologies?.split(',');

  const [openDeleteModal, setDeleteModal] = useState(false);

  const titleDelete =
    '¿Estas seguro de querer eliminar para siempre este link?';

  return (
    <>
      <div
        key={id}
        className="overflow-hidden w-full border-gray-100 rounded-xl 
      bg-white mb-2 dark:border-gray-800 dark:bg-[#3b3b3b]"
      >
        <div className="flex justify-between">
          <div className="flex pt-3 pl-3 items-center">
            <div className="h-14 w-14">
              {avatar && (
                <Image
                  className="rounded-full"
                  src={avatar}
                  height={56}
                  width={56}
                  layout="responsive"
                  alt={username}
                />
              )}
            </div>

            <div className="ml-2">
              <h4 className="text-xl">{username}</h4>
              <p className="text-sm font-light">
                <time title={createdAtFormated}>{timeago}</time>
              </p>
            </div>
          </div>
          {userId === user?.id && (
            <p className="pt-3 pr-3">
              <ButtonDelete setDeleteModal={setDeleteModal} />
            </p>
          )}
        </div>

        <div className="flex pl-4">
          <div className="flex-1 mt-2 inline-block">
            <h3 className=" dark:text-gray-50 text-xl font-bold mb-2">
              {titleWithUppercase}
            </h3>

            <p className=" dark:text-gray-200 mb-2 pr-3">
              {descriptionWithUppercase}
            </p>

            {tecnologies && (
              <div className="flex my-3">
                {tecnologiesArray.map((tecnologie) => (
                  <p
                    className="rounded-full shadow-md border text-violet-700 font-mono border-gray-300 bg-gray-200 px-3 py-[3px] mr-1 dark:text-gray-200 mb-2"
                    key={tecnologie}
                  >
                    {tecnologie}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {image && (
          <div className="h-70">
            <img src={image} className="h-auto w-full" alt={title} />
          </div>
        )}

        {likes.length > 0 && (
          <p>
            {likes[0].data().username !== user.username ? (
              <>Le gusta a {likes[0].data().username}</>
            ) : (
              likes.length > 1 && <>Le gusta a {likes[1].data().username} </>
            )}
            {likes.length > 1 && <>y a {likes.length}</>}
          </p>
        )}

        <div className="flex justify-around items-center h-auto my-2">
          <LikeButton id={id} likes={likes} />
          <button className="flex text-purple-700 items-center hover:bg-gray-200 p-2 rounded transition-all ease-in-out duration-300">
            <ChatIcon className="h-6 mr-1" /> Comentar
          </button>
          <a href={link} target="_blank" rel="noreferrer">
            <button className="flex text-purple-700 items-center hover:bg-gray-200 p-2 rounded transition-all ease-in-out duration-300">
              <ExternalLinkIcon className="h-6 mr-1" /> Visitar
            </button>
          </a>
          {githubRepo && (
            <a href={githubRepo} target="_blank" rel="noreferrer">
              <button className="flex text-purple-700 items-center hover:bg-gray-200 p-2 rounded transition-all ease-in-out duration-300">
                <CodeIcon className="h-6 mr-1" /> Repositorio
              </button>
            </a>
          )}
        </div>
      </div>

      <ModalDelete
        openDeleteModal={openDeleteModal}
        setDeleteModal={setDeleteModal}
        title={titleDelete}
        id={id}
        setDocumentDeleted={setDocumentDeleted}
      />
    </>
  );
};

export default LinkList;
