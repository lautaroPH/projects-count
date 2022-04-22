import { index } from './algoliaConfig';

export const getLinksResults = async (query, page = 0) => {
  const { hits } = await index.search(query, {
    hitsPerPage: 20,
    page,
  });

  const results = hits.map((hit) => {
    const {
      objectID: id,
      description,
      link,
      tecnologies,
      title,
      username,
      email,
      id: userId,
      githubRepo,
      userImage,
      timestamp,
      isEdited,
      image,
    } = hit;

    return {
      id,
      description,
      link,
      tecnologies,
      title,
      username,
      email,
      userId,
      githubRepo,
      userImage,
      timestamp,
      isEdited,
      image,
    };
  });
  return results;
};
