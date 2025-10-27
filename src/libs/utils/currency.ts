export const formatRupiah = (value: number | string, withSymbol: boolean = true) => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (num == null || isNaN(num)) return withSymbol ? 'Rp 0' : '0';

  const formatted = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);

  return withSymbol ? `Rp ${formatted}` : formatted;
};
