import Header from "components/Header/Header";
import MainRanking from "components/Ranking/MainRanking";

const ranking = () => {
  return (
    <div>
      <Header
        title="Ranking"
        description="Ranking para saber quien ha realizada la gran mayoria 
        de pajas a lo largo del tiempo, para descubrir quien es el más pajero"
      />

      <MainRanking />
    </div>
  );
};

export default ranking;
