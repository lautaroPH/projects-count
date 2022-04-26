import SkeletonLoaderLink from 'components/Loaders/SkeletonLoaderLink';
import useNearScreen from 'hooks/useNearScreen';
import { useState, useRef, useEffect } from 'react';
import { getLinksResults } from 'utils/getLinksResults';
import Linklist from './Link';

const ResultsLinks = ({ query }) => {
  const [links, setLinks] = useState([]);
  const [noLinks, setNoLinks] = useState(false);
  const [noMoreLinks, setMoreNoLinks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMoreLinks, setIsLoadingMoreLinks] = useState(false);
  const [page, setPage] = useState(1);

  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef: !links ? null : externalRef,
    once: false,
  });

  useEffect(() => {
    setIsLoading(true);
    getLinksResults(query).then((data) => {
      setLinks(data);
      setIsLoading(false);
      setNoLinks(data.length === 0);
    });
  }, [query]);

  useEffect(() => {
    if (isNearScreen && !isLoadingMoreLinks && !noMoreLinks) {
      setIsLoadingMoreLinks(true);

      getLinksResults(query, page).then((data) => {
        setLinks((prevLinks) => [...prevLinks, ...data]);
        setIsLoading(false);
        setPage(page + 1);
        setIsLoadingMoreLinks(false);
        setMoreNoLinks(data.length === 0);
      });
    }
  }, [query, page, isNearScreen, isLoadingMoreLinks, noMoreLinks]);

  return (
    <>
      {!noLinks ? (
        <h3 className="my-2 text-center text-gray-500">
          Resultados de la busqueda:{' '}
          <span className="font-semibold">{query}</span>
        </h3>
      ) : (
        <h3 className="font-semibold text-center text-gray-700 mt-7">
          No hay resultados
        </h3>
      )}

      {isLoading ? (
        <>
          <SkeletonLoaderLink />
          <SkeletonLoaderLink />
        </>
      ) : (
        <>
          <div className="mb-20 border-t border-gray-300 sm:border-none">
            {links.length > 0 &&
              links.map((link) => (
                <Linklist
                  id={link.id}
                  key={link.id}
                  title={link.title}
                  link={link.link}
                  description={link.description}
                  email={link.email}
                  userId={link.userId}
                  username={link.username}
                  githubRepo={link.githubRepo}
                  tecnologies={link.tecnologies}
                  image={link.image}
                  avatar={link.userImage}
                  timestamp={link.timestamp}
                  isEdited={link.isEdited}
                  isSearch={true}
                  setLinks={setLinks}
                  links={links}
                />
              ))}
            {isLoadingMoreLinks && !noLinks && <SkeletonLoaderLink />}
          </div>
          <div id="visor" ref={externalRef}></div>
        </>
      )}
    </>
  );
};

export default ResultsLinks;
