import { onSessionStateChanged } from 'firebaseFunction/onSessionStateChanged';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => onSessionStateChanged(setUser), []);

  return user;
}
