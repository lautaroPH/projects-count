import Header from 'components/Header/Header';
import AsideAboutMe from 'components/Home/AsideProfile/AsideAboutMe';
import Linklist from 'components/Home/Main/Link';
import SkeletonLoaderLink from 'components/Loaders/SkeletonLoaderLink';
import { getUserLinks } from 'firebaseFunction/getUserLinks';
import { getUserOnSpanshot } from 'firebaseFunction/getUserOnSpanshot';
import useUser from 'hooks/useUser';
import { useState, useEffect } from 'react';

export default function User({ data, userId }) {
  const [dataUser, setDataUser] = useState(null);
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);

  const user = useUser();

  useEffect(() => userId && getUserOnSpanshot(userId, setDataUser), [userId]);
  useEffect(
    () => getUserLinks(userId, setUserLinks, setLoading, setEmpty),
    [userId]
  );

  return (
    <div>
      <Header
        title={dataUser?.username || 'Usuario'}
        description={`Ver perfil y todas las publicacion creadas por el usuario: ${
          dataUser?.username || 'Usuario'
        }`}
        data={data}
      />
      <div className="flex items-center justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[25%_50%_25%] xl:grid-cols-[20%_35%_20%] justify-center w-full">
          <div className="mt-7">
            {dataUser && (
              <AsideAboutMe
                aboutMe={dataUser?.aboutMe}
                profession={dataUser?.profession}
                username={dataUser?.username}
                id={dataUser?.id}
                userId={user?.id}
              />
            )}
          </div>
          <div className="mb-20 mx-7 mt-7">
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
      </div>{' '}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { userId } = params;

  const data = {
    title: 'TITULO A VER',
    inicio: 'Inicio',
    ranking: 'Ranking',
    misProyectos: 'Mis proyectos',
    miPerfil: 'Mi perfil',
  };

  return { props: { data, userId } };
}
