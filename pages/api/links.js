import { db } from 'firebaseMain/firebaseAdmin';

export default async function links(request, response) {
  db.collection('links')
    .orderBy('timestamp', 'desc')
    .limit(4)
    .get()
    .then(({ docs, empty }) => {
      const links = docs.map((doc) => ({
        linkId: doc.id,
        ...doc.data(),
        doc,
        timestamp: { seconds: doc.data().timestamp._seconds },
      }));
      response.status(200).json({ empty, links });
    })
    .catch((error) => {
      response.status(500).json(error);
    });
}
