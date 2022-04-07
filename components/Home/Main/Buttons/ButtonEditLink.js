import ModalForm from 'components/Modals/ModalForm';
import { useState } from 'react';

const ButtonEditLink = ({
  id,
  title,
  link,
  description,
  githubRepo,
  tecnologies,
  image,
}) => {
  const [openEditform, setOpenEditform] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpenEditform(true)}
        className="p-1 mr-2 text-orange-400 transition-colors duration-300 ease-out border-2 border-transparent rounded-lg hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-400"
      >
        Editar
      </button>
      {openEditform && (
        <ModalForm
          openForm={openEditform}
          setOpenForm={setOpenEditform}
          isEditing={true}
          id={id}
          title={title}
          link={link}
          description={description}
          githubRepo={githubRepo}
          tecnologies={tecnologies}
          image={image}
        />
      )}
    </>
  );
};

export default ButtonEditLink;
