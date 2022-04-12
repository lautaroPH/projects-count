import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { swalUploadingLinkDark } from 'swals/dark/swalUploadingLinkDark';
import { swalUploadLinkSuccessDark } from 'swals/dark/swalUploadLinkSuccessDark';
import { swalUploadingLinkLight } from 'swals/light/swalUploadingLinkLight';
import { swalUploadLinkSuccessLight } from 'swals/light/swalUploadLinkSuccessLight';
import Swal from 'sweetalert2';
import { uploadImage } from './uploadImage';
import { uploadUser } from './uploadUser';

export const uploadLink = async (values, selectedFile, user, currentTheme) => {
  const { title, link, githubRepo, tecnologies, description } = values;

  currentTheme === 'dark'
    ? Swal.fire(swalUploadingLinkDark(title))
    : Swal.fire(swalUploadingLinkLight(title));

  const docRef = await addDoc(collection(db, 'links'), {
    title: title.trim(),
    link: link.trim(),
    githubRepo: githubRepo.trim(),
    tecnologies: tecnologies.trim(),
    description: description.trim(),
    allLikes: 0,
    username: user?.username,
    email: user?.email,
    id: user?.id,
    userImage: user?.avatar,
    timestamp: serverTimestamp(),
  });

  const id = docRef.id;

  if (selectedFile) {
    await uploadImage(selectedFile, id);
  }

  uploadUser(user?.id, user?.username, user?.avatar, user?.email);
  currentTheme === 'dark'
    ? Swal.fire(swalUploadLinkSuccessDark(title))
    : Swal.fire(swalUploadLinkSuccessLight(title));
};
