export const useDeleteArray = (array, id) => {
  const newArray = array.filter((arr) => arr.id !== id);

  return newArray;
};
