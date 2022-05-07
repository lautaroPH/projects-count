const ButtonEditLink = ({ setOpenEditform }) => {
  return (
    <>
      <button
        onClick={() => setOpenEditform(true)}
        className="p-1 mr-2 text-sm md:text-base text-orange-400 transition-colors duration-300 ease-out border-2 border-transparent rounded-lg hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-400"
      >
        Editar
      </button>
    </>
  );
};

export default ButtonEditLink;
