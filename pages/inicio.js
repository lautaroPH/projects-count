import Header from 'components/Header/Header';
import ButtonOpenModalForm from 'components/Home/ButtonOpenModalForm';
import ListOfLinks from 'components/Home/ListOfLinks';
import ModalForm from 'components/Modals/ModalForm';
import useUser from 'hooks/useUser';
import { useState } from 'react';

export default function Home() {
  const [openForm, setOpenForm] = useState(false);
  const user = useUser();
  return (
    <div>
      <Header
        title="Links"
        description="Dejar links, titulos, descripciones de videos +18 
        para compartir con los demas de forma totalmente anonima"
      />

      {user && openForm ? (
        <ModalForm openForm={openForm} setOpenForm={setOpenForm} />
      ) : (
        user && <ButtonOpenModalForm setOpenForm={setOpenForm} />
      )}
      <div className="grid lg:grid-cols-[200px_50%_200px] xl:grid-cols-[200px_38%_200px] justify-center">
        <h1>hola</h1>
        <ListOfLinks />
        <h1>hola</h1>
      </div>
    </div>
  );
}
