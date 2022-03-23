import ModalDelete from 'components/Modals/ModalDelete';
import { useDateTimeFormat } from 'hooks/useDateTimeFormat';
import { useTimeAgo } from 'hooks/useTimeAgo';
import useUser from 'hooks/useUser';
import { useState, useEffect } from 'react';
import ButtonDelete from './ButtonDelete';
import Image from 'next/image';
import { db } from 'firebaseMain/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import LikesCommentsNumber from './LikesCommentsNumber';
import AllButtons from './AllButtons';
import Tecnologies from './Tecnologies';

//TODO: intentar hacer que se muestre quien le da like con las caritas

const Link = ({
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

  const createdAt = new Date(parseInt(timestamp && timestamp?.seconds * 1000));
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
      bg-white mb-2 dark:border-gray-800 dark:bg-gray-900"
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

            {tecnologies && <Tecnologies tecnologiesArray={tecnologiesArray} />}
          </div>
        </div>

        {image && (
          <div className="h-70">
            <img src={image} className="h-auto w-full" alt={title} />
          </div>
        )}

        <LikesCommentsNumber likes={likes} username={user?.username} />

        <AllButtons id={id} likes={likes} githubRepo={githubRepo} link={link} />
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

export default Link;
