import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { useDeleteArray } from 'hooks/useDeleteArray';
import { useEditArray } from 'hooks/useEditArray';
import { swalNoLInkDark } from 'swals/dark/swalNoLInkDark';
import { swalNoLInkLight } from 'swals/light/swalNoLInkLight';
import Swal from 'sweetalert2';
import { getOneLink } from './getOneLink';
import { uploadImage } from './uploadImage';

export const editLink = async (
  id,
  values,
  selectedFile,
  setLinks,
  links,
  currentTheme
) => {
  await updateDoc(doc(db, 'links', id), {
    title: values.title.trim(),
    link: values.link.trim(),
    githubRepo: values.githubRepo.trim(),
    tecnologies: values.tecnologies.trim(),
    description: values.description.trim(),
    isEdited: true,
  })
    .then(async () => {
      if (selectedFile) {
        await uploadImage(selectedFile, id);
      }

      await getOneLink(id).then((linkEditedRef) => {
        const newArray = useEditArray(linkEditedRef, links, id);

        setLinks(newArray);
      });
    })
    .catch(() => {
      currentTheme === 'light'
        ? Swal.fire(swalNoLInkLight)
        : Swal.fire(swalNoLInkDark);

      const newArray = useDeleteArray(links, id);

      setLinks(newArray);
    });
};
