import SkeletonProfessionLoader from 'components/Loaders/SkeletonProfessionLoader';

const Profession = ({ profession }) => {
  return (
    <>
      {profession === undefined ? (
        <SkeletonProfessionLoader />
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300">
          {profession === '' ? 'Profesion' : profession}
        </p>
      )}
    </>
  );
};

export default Profession;
