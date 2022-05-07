import { loginWithGithub } from 'firebaseFunction/loginWithGithub';
import { uploadUser } from 'firebaseFunction/uploadUser';
import { useState } from 'react';

const ButtonSelectSvgToLogin = ({ firstIcon, secondIcon, searchMobile }) => {
  const [githubHoverIcon, setGithubHoverIcon] = useState(false);

  const handleClick = async () => {
    const userLogin = await loginWithGithub();
    uploadUser(userLogin.user);
  };
  return (
    <button
      className={`${
        searchMobile ? 'pr-2' : 'flex'
      } "flex items-center h-10 sm:h-12 px-2 font-normal text-white transition-all duration-300 border rounded border-violet-800 dark:border-white focus:outline-none bg-violet-800 hover:text-violet-800 dark:bg-white dark:hover:text-white hover:bg-transparent dark:hover:bg-transparent dark:text-black mr-4 sm:mr-7`}
      onClick={handleClick}
      onMouseOver={() => setGithubHoverIcon(true)}
      onMouseLeave={() => setGithubHoverIcon(false)}
    >
      {!githubHoverIcon ? firstIcon : secondIcon}
      <span className={`${searchMobile ? 'hidden' : 'block'} sm:pr-2 ml-2`}>
        Ingresar
      </span>
    </button>
  );
};

export default ButtonSelectSvgToLogin;
