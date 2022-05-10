import Link from 'next/link';
const UserLastLinkImage = ({ index, image, linkLength, linkId }) => {
  const imageLink = index + 1;
  const as1 = linkLength !== 5 ? true : imageLink !== 5;
  const as2 = linkLength !== 3 ? true : imageLink !== 3;

  return (
    <>
      {imageLink <= 6 && as1 && as2 && (
        <Link passHref href={`/link/${linkId}`}>
          <a className="w-full h-full">
            <figure className="w-full h-full">
              <img
                src={image}
                alt="Portada"
                className="object-cover w-full h-full "
              />
            </figure>
          </a>
        </Link>
      )}
    </>
  );
};

export default UserLastLinkImage;
