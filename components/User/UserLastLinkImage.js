/* eslint-disable @next/next/no-img-element */
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
                className={`${
                  imageLink === 1 && linkLength <= 3
                    ? ' rounded-t-3xl'
                    : imageLink === 2 && linkLength <= 3
                    ? ' rounded-b-3xl'
                    : imageLink === 1 && linkLength > 3
                    ? ' rounded-tl-3xl'
                    : imageLink === 2 && linkLength > 3
                    ? ' rounded-bl-3xl'
                    : imageLink === 3 && linkLength <= 5
                    ? ' rounded-tr-3xl'
                    : imageLink === 4 && linkLength <= 5
                    ? ' rounded-br-3xl'
                    : imageLink === 5
                    ? 'rounded-tr-3xl'
                    : imageLink === 6 && 'rounded-br-3xl'
                } object-cover w-full h-full`}
              />
            </figure>
          </a>
        </Link>
      )}
    </>
  );
};

export default UserLastLinkImage;
