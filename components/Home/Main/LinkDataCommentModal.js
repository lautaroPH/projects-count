import Image from 'next/image';

const LinkDataCommentModal = ({
  avatar,
  username,
  createdAtFormated,
  timeago,
  title,
  description,
}) => {
  return (
    <div className="mb-5 overflow-hidden">
      <div className="flex justify-between">
        <div className="flex items-center pt-3 pl-3">
          <div className="w-10 h-10 sm:h-12 sm:w-12">
            {avatar && (
              <Image
                className="rounded-full"
                src={avatar}
                height={56}
                width={56}
                layout="responsive"
                alt={username}
              />
            )}
          </div>

          <div className="ml-2">
            <h4 className="text-base sm:text-xl">{username}</h4>
            <p className="mb-1 text-xs font-light sm:text-sm">
              <time title={createdAtFormated}>{timeago}</time>
            </p>
          </div>
        </div>
      </div>

      <div className="pl-4 mt-2">
        <h3 className="mb-2 text-xl font-bold dark:text-gray-50">{title}</h3>

        <p className="pr-3 mb-2 dark:text-gray-200">{description}</p>
      </div>
    </div>
  );
};

export default LinkDataCommentModal;
