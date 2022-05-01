import Header from 'components/Header/Header';
import AsideProfile from 'components/Home/AsideProfile/AsideProfile';
import AsideRanking from 'components/Home/AsideRanking/AsideRanking';
import ListOfLinks from 'components/Home/Main/ListOfLinks';
import ResultsLinks from 'components/Home/Main/ResultsLinks';
import { useRouter } from 'next/router';

export default function Home({ data }) {
  const router = useRouter();

  const query = router.query.keyword;

  return (
    <div>
      <Header
        title="Inicio"
        description="Crear publicacion sobre los proyectos que desarrollaste, compartir con otros y comenta sobre otras publicaciones"
        data={data}
      />

      <div className="flex items-center justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[25%_50%_25%] xl:grid-cols-[20%_35%_20%] justify-center w-full">
          <AsideProfile />
          <div className="mx-7">
            {query ? <ResultsLinks query={query} /> : <ListOfLinks />}
          </div>
          <div className="mt-7">
            <AsideRanking />
          </div>
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
    miPerfil: 'Mi perfil',
  };

  return { props: { data } };
}
