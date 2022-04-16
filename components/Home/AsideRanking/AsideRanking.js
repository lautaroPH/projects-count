import { getUsers } from "firebaseFunction/getUsers";
import { useEffect, useState } from "react";
import UserRank from "./UserRank";
import Link from "next/link";

const AsideRanking = () => {
  const [usersRanks, setUsersRanks] = useState([]);

  useEffect(() => getUsers(setUsersRanks), []);

  return (
    <div className="bg-white rounded-xl w-80 px-5 dark:bg-gray-900">
      <h2 className="text-center text-violet-700 dark:text-white pt-2 text-xl">
        Ranking
      </h2>
      {usersRanks.length > 0 &&
        usersRanks.map((userRank) => (
          <UserRank
            key={userRank.id}
            id={userRank.id}
            username={userRank.data().username}
            avatar={userRank.data().avatar}
            linksNumber={userRank.data().linksNumber}
          />
        ))}
      <div className="text-center py-2">
        <Link passHref href="/ranking">
          <a className="text-sm text-violet-600 dark:text-white hover:underline">
            Ver todo
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AsideRanking;
