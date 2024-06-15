export const parseFilterParams = (query) => {
  const type = query.type;
  const isFavourite = query.isFavourite === 'true' ? true : false;
  return { type, isFavourite };
};
