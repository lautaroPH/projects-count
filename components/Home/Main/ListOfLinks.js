import { useEffect, useState, useContext, useRef } from 'react';
import Linklist from './Link';
import ButtonOpenModalForm from './Buttons/ButtonOpenModalForm';
import useUser from 'hooks/useUser';
import SkeletonLoaderLink from 'components/Loaders/SkeletonLoaderLink';
import { getLinks } from 'firebaseFunction/getLinks';
import OrderByLinks from './OrderByLinks';
import { OrderByValue } from 'context/OrderByContext';
import useNearScreen from 'hooks/useNearScreen';
import { getMoreLinks } from 'firebaseFunction/getMoreLinks';

const ListOfLinks = () => {
  const [links, setLinks] = useState([]);
  const [noLinks, setNoLinks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMoreLinks, setIsLoadingMoreLinks] = useState(false);

  const user = useUser();
  const { value } = useContext(OrderByValue);
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef: !links ? null : externalRef,
    once: false,
  });

  useEffect(() => getLinks(setNoLinks, setLinks, value, setIsLoading), [value]);

  useEffect(() => {
    if (isNearScreen && !noLinks && !isLoadingMoreLinks) {
      const lastVisible = links[links.length - 1];
      getMoreLinks(
        setNoLinks,
        setLinks,
        value,
        setIsLoadingMoreLinks,
        lastVisible
      );
    }
  }, [isNearScreen, value, links, noLinks, isLoadingMoreLinks]);

  return (
    <div className="lg:mt-7">
      {user && <ButtonOpenModalForm setLinks={setLinks} />}
      <OrderByLinks />

      {isLoading ? (
        <>
          <SkeletonLoaderLink />
          <SkeletonLoaderLink />
        </>
      ) : (
        <>
          <div className="mb-20 border-t border-gray-300 dark:border-gray-800 md:border-none">
            {links.map((link) => (
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
                setLinks={setLinks}
                links={links}
                openComment={false}
              />
            ))}
            {isLoadingMoreLinks && !noLinks && <SkeletonLoaderLink />}
          </div>
          <div id="visor" ref={externalRef}></div>
        </>
      )}
    </div>
  );
};

export default ListOfLinks;
