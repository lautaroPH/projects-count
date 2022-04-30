import { loginWithGithub } from 'firebaseFunction/loginWithGithub';
import { uploadUser } from 'firebaseFunction/uploadUser';
import { useState } from 'react';

const ButtonSelectSvgToLogin = ({ firstIcon, secondIcon }) => {
  const [githubHoverIcon, setGithubHoverIcon] = useState(false);

  const handleClick = async () => {
    const userLogin = await loginWithGithub();
    uploadUser(userLogin.user);
  };
  return (
    <button
      className="flex items-center h-12 px-4 font-normal text-white transition-all duration-300 border rounded border-violet-800 dark:border-white focus:outline-none bg-violet-800 hover:text-violet-800 dark:bg-white dark:hover:text-white hover:bg-transparent dark:hover:bg-transparent dark:text-black mr-7"
      onClick={handleClick}
      onMouseOver={() => setGithubHoverIcon(true)}
      onMouseLeave={() => setGithubHoverIcon(false)}
    >
      {!githubHoverIcon ? firstIcon : secondIcon}
      <span className="pr-2">Ingresar</span>
    </button>
  );
};

export default ButtonSelectSvgToLogin;
