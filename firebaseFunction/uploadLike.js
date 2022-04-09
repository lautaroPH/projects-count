import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { useDeleteArray } from 'hooks/useDeleteArray';
import { swalNoLInkDark } from 'swals/dark/swalNoLInkDark';
import { swalNoLInkLight } from 'swals/light/swalNoLInkLight';
import Swal from 'sweetalert2';
import { getOneLink } from './getOneLink';
import { uploadUserLike } from './uploadUserLike';

export const uploadLike = async (
  id,
  user,
  dataUserLike,
  links,
  setLinks,
  currentTheme
) => {
  const { id: userId, username } = user;

  getOneLink(id)
    .then(async () => {
      await setDoc(doc(db, 'links', id, 'likes', userId), {
        id: userId,
        username,
        timestamp: serverTimestamp(),
      });

      uploadUserLike(id, userId, dataUserLike);
    })
    .catch(() => {
      currentTheme === 'light'
        ? Swal.fire(swalNoLInkLight)
        : Swal.fire(swalNoLInkDark);

      const newArray = useDeleteArray(links, id);

      setLinks(newArray);
    });
};
