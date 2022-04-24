import { db } from 'firebaseMain/firebaseAdmin';

export default async function links(request, response) {
  const { query } = request;
  const { id } = query;

  db.collection('links')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { timestamp } = data;

      response.json({
        ...data,
        id,
        userId: data.id,
        timestamp: timestamp._seconds * 1000,
      });
    })
    .catch(() => {
      response.status(404).end();
    });
}
