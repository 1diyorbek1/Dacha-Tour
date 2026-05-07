export const formatPriceUz = (value) => {
  if (value === null || value === undefined || value === '') return '';
  const num = Number(value);
  if (isNaN(num) || num === 0) return '';

  return `${num}$`;
};
