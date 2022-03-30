import { loginWithGithub } from 'firebaseFunction/loginWithGithub';
import { useState } from 'react';

const ButtonSelectSvgToLogin = ({ firstIcon, secondIcon }) => {
  const [githubHoverIcon, setGithubHoverIcon] = useState(false);

  const handleClick = () => {
    loginWithGithub();
  };
  return (
    <button
      className="flex items-center border border-violet-800 dark:border-white  h-12 rounded focus:outline-none  
    transition-all duration-300 font-normal bg-violet-800 hover:text-violet-800 text-white dark:bg-white dark:hover:text-white hover:bg-transparent dark:hover:bg-transparent dark:text-black px-4 mr-7"
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
