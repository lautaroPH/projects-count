import HomeDescription from 'components/HomeDescriptions';
import useUser from 'hooks/useUser';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Index() {
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push('/inicio');
  }

  return (
    <div>
      <Head>
        <title>Shareit</title>
        <meta
          name="description"
          content="Compartí tus proyectos, interactua con otros programadores y aprende en el proceso"
        />
      </Head>
      {user === undefined && <HomeDescription />}
    </div>
  );
}
