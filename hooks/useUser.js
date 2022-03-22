import { useEffect, useState } from 'react';
import { onSessionStateChanged } from 'firebaseMain/firebaseFunction';

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => onSessionStateChanged(setUser), []);

  return user;
}
