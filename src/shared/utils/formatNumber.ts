export const formatNumber = (value: number | string): string =>
  new Intl.NumberFormat('ru-RU').format(Number(value));
