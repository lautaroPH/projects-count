import Image from "next/image";

const UserRank = ({ id, username, avatar, linksNumber }) => {
  return (
    <div
      key={id}
      className="flex items-center justify-between border-b-2 dark:border-b-gray-800 pb-2 pt-2"
    >
      <div className="flex items-center">
        <div className="h-9 w-9 rounded-full">
          <Image
            height={36}
            width={36}
            layout="responsive"
            className="rounded-full h-9 w-9"
            src={avatar}
            alt="user avatar"
            priority={true}
          />
        </div>
        <h4 className="ml-2 font-semibold">{username}</h4>
      </div>
      <p>{linksNumber}</p>
    </div>
  );
};

export default UserRank;
