import { useDateTimeFormat } from 'hooks/useDateTimeFormat';
import { useTimeAgo } from 'hooks/useTimeAgo';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import Tecnologies from './Tecnologies';
import ButtonDelete from './Buttons/ButtonDelete';
import Footer from './Footer';
import ButtonEditLink from './Buttons/ButtonEditLink';
import ModalForm from 'components/Modals/ModalForm';
import { useState } from 'react';
import Link from 'next/link';

//TODO: intentar hacer que se muestre quien le da like con las caritas

const Linklist = ({
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
  username,
  setLinks,
  isSearch,
  links,
  isEdited,
  openComment,
  isOneLink,
}) => {
  const user = useUser();
  const [openEditform, setOpenEditform] = useState(false);

  const dataUserLike = {
    title,
    link,
    description,
    timestamp,
    avatar,
    username,
  };

  const createdAt = timestamp !== null && new Date(parseInt(timestamp));
  const timeago = useTimeAgo(createdAt !== undefined && createdAt);
  const createdAtFormated = useDateTimeFormat(
    createdAt !== undefined && createdAt
  );

  const titleWithUppercase = title.charAt(0).toUpperCase() + title.slice(1);
  const descriptionWithUppercase =
    description.charAt(0).toUpperCase() + description.slice(1);

  const tecnologiesArray = tecnologies?.split(',');

  return (
    <>
      <div
        key={id}
        className="overflow-hidden bg-white border-b border-gray-100 sm:rounded-xl border-b-gray-300 sm:border-none sm:mb-2 dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="flex justify-between">
          <div className="flex items-center pt-3 pl-3">
            <div className="w-10 h-10 sm:h-14 sm:w-14">
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
              <Link href={`/usuario/${userId}`}>
                <a>
                  <h4 className="text-base sm:text-xl hover:underline">
                    {username}
                  </h4>
                </a>
              </Link>
              <p className="mb-1 text-xs font-light sm:text-sm">
                <time title={createdAtFormated}>{timeago}</time>
                {isEdited && <span className="ml-1">• Editado •</span>}
              </p>
            </div>
          </div>
          {userId === user?.id && (
            <p className="pt-3 pr-3">
              <ButtonEditLink setOpenEditform={setOpenEditform} />
              <ButtonDelete
                setLinks={setLinks}
                links={links}
                id={id}
                image={image}
                userId={user?.id}
                isOneLink={isOneLink}
              />
            </p>
          )}
        </div>

        <div className="pl-4 mt-2">
          <Link passHref href={`/link/${id}`}>
            <a>
              <h3 className="mb-2 text-xl font-bold dark:text-gray-50 hover:underline">
                {titleWithUppercase}
              </h3>
            </a>
          </Link>

          <p className="pr-3 mb-2 dark:text-gray-200">
            {descriptionWithUppercase}
          </p>

          {tecnologies && <Tecnologies tecnologiesArray={tecnologiesArray} />}
        </div>

        {image && (
          <div className="w-full h-auto">
            <img src={image} alt={title} className="w-full h-auto" />
          </div>
        )}

        <Footer
          id={id}
          dataUserLike={dataUserLike}
          githubRepo={githubRepo}
          link={link}
          title={title}
          links={links}
          setLinks={setLinks}
          openComment={openComment}
          isOneLink={isOneLink}
        />
      </div>
      {openEditform && (
        <ModalForm
          openForm={openEditform}
          setOpenForm={setOpenEditform}
          isEditing={true}
          id={id}
          title={title}
          link={link}
          description={description}
          githubRepo={githubRepo}
          tecnologies={tecnologies}
          image={image}
          links={links}
          setLinks={setLinks}
          isSearch={isSearch}
          isOneLink={isOneLink}
        />
      )}
    </>
  );
};

export default Linklist;
