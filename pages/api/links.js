import { db } from 'firebaseMain/firebaseAdmin';

export default async function links(request, response) {
  db.collection('links')
    .orderBy('timestamp', 'desc')
    .get()
    .then(({ docs, empty }) => {
      const links = docs.map((doc) => ({
        id: doc.id,
      }));
      response.status(200).json(links);
    })
    .catch((error) => {
      response.status(500).json(error);
    });
}
