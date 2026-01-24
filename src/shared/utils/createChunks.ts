export const createChunks = <T>(arr: T[], size: number): T[][] =>
  arr.reduce((acc, item, index) => {
    if (index % size === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }

    return acc;
  }, [] as T[][]);
