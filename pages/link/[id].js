import Header from 'components/Header/Header';
import Linklist from 'components/Home/Main/Link';
import { useState } from 'react';

export default function Link({ data }) {
  const [link, setlink] = useState({
    githubRepo: '',
    isEdited: false,
    email: 'lautaroph@gmail.com',
    username: 'Lautaro Perez Herrera',
    userImage: 'https://avatars.githubusercontent.com/u/74931899?v=4',
    image:
      'https://firebasestorage.googleapis.com/v0/b/projects-count.appspot.com/o/links%2FuCCvA9IhcBg92M4gksFq%2Fimage?alt=media&token=651f417f-46c5-4886-b474-c37ff14f63b6',
    title: 'dasdasd',
    description: 'asd as asd',
    link: 'https://asd.com',
    tecnologies: '',
    id: 'uCCvA9IhcBg92M4gksFq',
    allLikes: 0,
    timestamp: 1651342219000,
    userId: 'hcCWdL6srHTiNvR2JWrAqXdCC2E2',
  });

  return (
    <div>
      <Header
        title={link.title}
        description="Ranking para saber quien ha realizada la gran mayoria 
        de pajas a lo largo del tiempo, para descubrir quien es el más pajero"
        data={data}
      />

      <div className="flex items-center justify-center ">
        <div className="w-2/4 mb-20 ml-6 border-t border-gray-300 mt-7 sm:border-none">
          <Linklist
            id={link?.id}
            key={link?.id}
            title={link?.title}
            link={link?.link}
            description={link?.description}
            email={link?.email}
            userId={link?.userId}
            username={link?.username}
            githubRepo={link?.githubRepo}
            tecnologies={link?.tecnologies}
            image={link?.image}
            avatar={link?.userImage}
            timestamp={link?.timestamp}
            isEdited={link?.isEdited}
            isOneLink={true}
            openComment={true}
            links={link}
            setLinks={setlink}
          />{' '}
        </div>
      </div>
    </div>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch('http://localhost:3000/api/links');
//   const links = await res.json();

//   const paths = links.map((link) => ({
//     params: { id: link.id },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getStaticProps() {
  // const { id } = params;

  // const res = await fetch(`http://localhost:3000/api/link/${id}`);
  // const dataLink = await res.json();

  const data = {
    title: 'TITULO A VER',
    inicio: 'Inicio',
    ranking: 'Ranking',
    misProyectos: 'Mis proyectos',
    miPerfil: 'Mi perfil',
  };

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
