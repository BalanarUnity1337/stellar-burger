export const createChunks = <T>(arr: T[], size: number): T[][] => {
  if (size <= 0) {
    throw new Error('Chunk size must be greater than 0');
  }

  return arr.reduce((acc, item, index) => {
    if (index % size === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }

    return acc;
  }, [] as T[][]);
};
