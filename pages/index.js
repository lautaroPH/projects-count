import HomeDescription from 'components/HomeDescriptions';
import useUser from 'hooks/useUser';
import { useRouter } from 'next/router';

export default function Index() {
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push('/inicio');
  }

  return <div>{user === undefined && <HomeDescription />}</div>;
}
