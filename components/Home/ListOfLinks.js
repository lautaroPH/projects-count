import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { useEffect, useState } from 'react';
import LinkList from './LinkList';
import SkeletonLoaderLink from '../Loaders/SkeletonLoaderLink';

const ListOfLinks = () => {
  const [links, setLinks] = useState([]);
  const [noLinks, setNoLinks] = useState(false);
  const [documentDeleted, setDocumentDeleted] = useState(false);

  useEffect(() => {
    if (documentDeleted) {
      const unsubscribe = onSnapshot(
        query(collection(db, 'links'), orderBy('timestamp', 'desc'), limit(30)),
        (snapshot) => {
          setNoLinks(snapshot.empty);
          setLinks(snapshot.docs);
          setDocumentDeleted(false);
        }
      );
      return () => {
        unsubscribe();
      };
    } else {
      const unsubscribe = onSnapshot(
        query(collection(db, 'links'), orderBy('timestamp', 'desc'), limit(30)),
        (snapshot) => {
          setNoLinks(snapshot.empty);
          setLinks(snapshot.docs);
        }
      );
      return () => {
        unsubscribe();
      };
    }
  }, [documentDeleted]);

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
    <div id="ver-links">
      {links.length === 0 && !noLinks ? (
        <SkeletonLoaderLink />
      ) : (
        <div className="my-2">
          {links.map((link) => (
            <LinkList
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
              setDocumentDeleted={setDocumentDeleted}
            />
          ))}
        </div>
      )}
      {noLinks && (
        <h4 className="sm:ml-16 ml-4 text-red-600 font-medium">
          No hay links para mostrar
        </h4>
      )}
    </div>
  );
};

export default ListOfLinks;
