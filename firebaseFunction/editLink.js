import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { useDeleteArray } from 'hooks/useDeleteArray';
import { useEditArray } from 'hooks/useEditArray';
import { swalNoLInkDark } from 'swals/dark/swalNoLInkDark';
import { swalUploadEditLinkSuccessDark } from 'swals/dark/swalUploadEditLinkSuccessDark';
import { swalUploadingEditLinkDark } from 'swals/dark/swalUploadingEditLinkDark';
import { swalNoLInkLight } from 'swals/light/swalNoLInkLight';
import { swalUploadEditLinkSuccessLight } from 'swals/light/swalUploadEditLinkSuccessLight';
import { swalUploadingEditLinkLight } from 'swals/light/swalUploadingEditLinkLight';
import Swal from 'sweetalert2';
import { getOneLink } from './getOneLink';
import { uploadImage } from './uploadImage';

export const editLink = async (
  id,
  values,
  selectedFile,
  setLinks,
  links,
  currentTheme,
  isSearch
) => {
  currentTheme === 'dark'
    ? Swal.fire(swalUploadingEditLinkDark(values?.title))
    : Swal.fire(swalUploadingEditLinkLight(values?.title));

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

      await getOneLink(id, isSearch).then((linkEditedRef) => {
        const newArray = useEditArray(linkEditedRef, links, id);

        setLinks(newArray);
      });

      currentTheme === 'dark'
        ? Swal.fire(swalUploadEditLinkSuccessDark(values?.title))
        : Swal.fire(swalUploadEditLinkSuccessLight(values?.title));
    })
    .catch(() => {
      currentTheme === 'dark'
        ? Swal.fire(swalNoLInkDark)
        : Swal.fire(swalNoLInkLight);

      const newArray = useDeleteArray(links, id);

      setLinks(newArray);
    });
};
