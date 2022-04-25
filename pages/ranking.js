import Header from 'components/Header/Header';
import MainRanking from 'components/Ranking/MainRanking';

export default function Rank({ data }) {
  return (
    <div>
      <Header
        title="Ranking"
        description="Ranking para saber quien ha realizada la gran mayoria 
        de pajas a lo largo del tiempo, para descubrir quien es el más pajero"
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
