import { useEffect, useState, useContext } from 'react';
import Link from './Link';
import ButtonOpenModalForm from './Buttons/ButtonOpenModalForm';
import useUser from 'hooks/useUser';
import SkeletonLoaderLink from 'components/Loaders/SkeletonLoaderLink';
import { getLinks } from 'firebaseFunction/getLinks';
import OrderByLinks from './OrderByLinks';
import { OrderByValue } from 'context/OrderByContext';

const ListOfLinks = () => {
  const [links, setLinks] = useState([]);
  const [noLinks, setNoLinks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const user = useUser();
  const { value } = useContext(OrderByValue);

  useEffect(() => getLinks(setNoLinks, setLinks, value, setIsLoading), [value]);

  // const getMoreLinks = async () => {
  //   setHasNextPage(true);
  //   if (links.length > 1) {
  //     const lastVisible = links[links.length - 1];

  //     const next = query(
  //       collection(db, 'links'),
  //       orderBy('timestamp', 'desc'),
  //       startAfter(lastVisible),
  //       limit(30)
  //     );

  //     const documentSnapshotsNew = await getDocs(next);

  //     setLinks((link) => [...link, ...documentSnapshotsNew.docs]);

  //     documentSnapshotsNew.docs.length === 0
  //       ? setHasMore(false)
  //       : setHasMore(true);
  //   }
  //   setHasNextPage(false);
  // };

  return (
    <>
      {user && <ButtonOpenModalForm />}
      <OrderByLinks />
      {isLoading ? (
        <>
          <SkeletonLoaderLink />
          <SkeletonLoaderLink />
        </>
      ) : (
        <div className="mb-20 border-t border-gray-300 sm:border-none">
          {links.map((link) => (
            <Link
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
              timestamp={link?.data()?.timestamp}
              setLinks={setLinks}
              links={links}
              isEdited={link?.data()?.isEdited}
            />
          ))}
        </div>
      )}
      {noLinks && (
        <h4 className="ml-4 font-medium text-red-600 sm:ml-16">
          No hay links para mostrar
        </h4>
      )}
    </>
  );
};

export default ListOfLinks;
