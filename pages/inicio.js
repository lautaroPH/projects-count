import Header from 'components/Header/Header';
import AsideAboutMe from 'components/Home/AsideProfile/AsideAboutMe';
import ListOfLinks from 'components/Home/Main/ListOfLinks';

export default function Home({ data }) {
  return (
    <div>
      <Header
        title="Links"
        description="Dejar links, titulos, descripciones de videos +18 
        para compartir con los demas de forma totalmente anonima"
        data={data}
      />

      <div className="flex items-center justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[25%_50%_25%] xl:grid-cols-[20%_35%_20%] justify-center mt-7 w-full">
          <AsideAboutMe />
          <div className="mx-7">
            <ListOfLinks />
          </div>
          <div className="bg-white h-72 w-80"></div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = {
    title: 'TITULO A VER',
    inicio: 'Inicio',
    ranking: 'Ranking',
    misProyectos: 'Mis proyectos',
  };

  return { props: { data } };
}
