export const replaceMongoIdArray = (array) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest); // Remove the original _id field
  return mappedArray;
};

export const replaceMongoIdObject = (obj) => {
  const { _id, ...updateObj } = { ...obj, id: obj._id.toString() };
  return updateObj;
};

export const isDateInBetween = (date, from, to) => {
  return (
    new Date(date).getTime() >= new Date(from).getTime() &&
    new Date(date).getTime() <= new Date(to).getTime()
  );
};
