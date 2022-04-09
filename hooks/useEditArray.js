export const useEditArray = (newData, array, id) => {
  const newArray = array.map((arr) => {
    if (arr.id === id) {
      return newData;
    }
    return arr;
  });

  return newArray;
};
