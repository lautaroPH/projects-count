import Header from 'components/Header/Header';
import UserLastsLinks from 'components/User/UserLastsLinks';
import UserListLinks from 'components/User/UserListLinks';
import UserProfile from 'components/User/UserProfile';
import { getUserOnSpanshot } from 'firebaseFunction/getUserOnSpanshot';
import { useState, useEffect, useContext } from 'react';
import { getUserLinks } from 'firebaseFunction/getUserLinks';
import { OrderByValue } from 'context/OrderByContext';

export default function User({ data, userId, dataUserServer }) {
  const [dataUser, setDataUser] = useState(dataUserServer);
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const { value } = useContext(OrderByValue);

  useEffect(
    () => getUserLinks(userId, setUserLinks, setLoading, setEmpty, value),
    [userId, value]
  );

  useEffect(() => userId && getUserOnSpanshot(userId, setDataUser), [userId]);

  return (
    <main>
      <Header
        title={dataUser?.username || 'Usuario'}
        description={`Ver perfil y todas las publicacion creadas por el usuario: ${
          dataUser?.username || 'Usuario'
        }`}
        data={data}
      />
      <div className="flex items-center justify-center w-full">
        <div className="lg:grid lg:grid-cols-[65%_35%] xl:grid-cols-[10%_45%_20%] lg:justify-center lg:w-full">
          <div className="hidden xl:block"></div>
          <section className="lg:mx-7 lg:mt-7">
            <UserProfile
              userId={dataUser?.id}
              username={dataUser?.username}
              aboutMe={dataUser?.aboutMe}
              profession={dataUser?.profession}
              avatar={dataUser?.avatar}
              portfolio={dataUser?.portfolio}
              banner={dataUser?.banner}
            />

            <UserListLinks
              userLinks={userLinks}
              empty={empty}
              loading={loading}
              setUserLinks={setUserLinks}
            />
          </section>

          <section className="hidden lg:block">
            <UserLastsLinks userLinks={userLinks} loading={loading} />
          </section>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const { userId } = params;
  const res = await fetch(`http://localhost:3000/api/user/${userId}`);
  if (res.ok) {
    const dataUserServer = await res.json();

    const data = {
      title: 'Shareit',
      inicio: 'Inicio',
      ranking: 'Ranking',
      misProyectos: 'Mis proyectos',
      miPerfil: 'Mi perfil',
    };

    return { props: { data, userId, dataUserServer } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
}
