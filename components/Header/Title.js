import Link from 'next/link';

const Title = () => {
  return (
    <div className="relative hover:opacity-70">
      <h1 className="text-xl font-bold text-purple-700 dark:text-white">
        <Link href="/inicio">TITULO A VER</Link>
      </h1>
    </div>
  );
};

export default Title;
