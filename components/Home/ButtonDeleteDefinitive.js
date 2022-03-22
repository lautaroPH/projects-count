import { deleteLink } from 'firebaseMain/firebaseFunction';
import { useState } from 'react';

const ButtonDeleteDefinitive = ({ id, setDocumentDeleted }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await deleteLink({ id });
    setDocumentDeleted(true);
  };

  return (
    <button
      disabled={deleting}
      className="rounded-md border border-transparent shadow-sm px-4 py-2 
                  bg-red-600 text-base font-medium text-white transition-colors ease-in-out
                  duration-150 hover:bg-red-700 sm:text-sm disabled:cursor-not-allowed disabled:bg-red-400"
      onClick={handleDelete}
    >
      {deleting ? 'Borrando...' : ' Borrar definitivamente'}
    </button>
  );
};

export default ButtonDeleteDefinitive;
