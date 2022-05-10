import { db } from 'firebaseMain/firebaseAdmin';

export default async function links(request, response) {
  const { query } = request;
  const { userId } = query;

  db.collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;

      response.json({
        ...data,
        id,
        userId: data.id,
      });
    })
    .catch(() => {
      response.status(404).end();
    });
}
