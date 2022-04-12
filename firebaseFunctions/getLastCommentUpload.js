import { getOneComment } from './getOneComment';

export const getLastCommentUpload = async (id, commentId, setComments) => {
  getOneComment(id, commentId)
    .then(async (commentRef) => {
      setComments((comment) => [commentRef, ...comment]);
    })
    .catch((e) => {
      console.log(e);
    });
};
