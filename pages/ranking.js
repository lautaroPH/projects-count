import Header from 'components/Header/Header';
import MainRanking from 'components/Ranking/MainRanking';

export default function Rank({ data }) {
  return (
    <div>
      <Header
        title="Ranking"
        description="Ranking para demostrar quien es el usuario más activo y competir con los demás usuarios para lograr el top 1"
        data={data}
      />

      <MainRanking />
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
