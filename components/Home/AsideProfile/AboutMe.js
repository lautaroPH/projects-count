import SkeletonAboutMeLoader from 'components/Loaders/SkeletonAboutMeLoader';

const AboutMe = ({ aboutMe }) => {
  return (
    <div className="pt-2 pb-4 px-7">
      <h2 className="text-violet-600 mb-[2px] font-semibold text-center dark:text-white">
        Sobre mi
      </h2>
      {aboutMe === undefined ? (
        <SkeletonAboutMeLoader />
      ) : (
        <p className="text-sm text-center whitespace-pre-line">
          {aboutMe === '' ? 'undefined' : aboutMe}
        </p>
      )}
    </div>
  );
};

export default AboutMe;
