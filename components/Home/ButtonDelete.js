const ButtonDelete = ({ setDeleteModal }) => {
  return (
    <button
      className="ml-2 text-red-500
    transition-colors border-2 border-transparent ease-out duration-300 
    hover:text-red-700 dark:hover:text-red-400 hover:border-red-600 p-1 rounded-lg"
      onClick={() => setDeleteModal(true)}
    >
      Eliminar
    </button>
  );
};

export default ButtonDelete;
