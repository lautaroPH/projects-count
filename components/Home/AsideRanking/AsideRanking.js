import { getUsers } from "firebaseFunction/getUsers";
import { useEffect, useState } from "react";
const AsideRanking = () => {
  const [usersRanks, setUsersRanks] = useState([]);

  useEffect(() => getUsers(setUsersRanks), []);

  return (
    <div className="bg-white w-80 px-5">
      <h2 className="text-center text-violet-700 pt-2 text-xl">Ranking</h2>
      {usersRanks.length > 0 &&
        usersRanks.map((userRank, i) => (
          <div
            key={userRank.id}
            className="flex items-center justify-between border-b-2 pb-2 pt-2"
          >
            <div className="flex items-center">
              <img
                className="rounded-full h-9 w-9"
                src={userRank.data().avatar}
                alt=""
              />
              <h4 className="ml-2 font-semibold">{userRank.data().username}</h4>
            </div>
            <p>{userRank.data().linksNumber}</p>
          </div>
        ))}
      <button className="w-full py-2 text-sm text-center text-violet-600 dark:text-white hover:underline">
        Ver todo
      </button>
    </div>
  );
};

export default AsideRanking;
