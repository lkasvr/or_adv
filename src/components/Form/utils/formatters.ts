export const formatCNPJ = (value: string) => {
  value = value.replace(/^(\d{2})(\d)/, '$1.$2');
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
  value = value.replace(/(\d{4})(\d)/, '$1-$2');
  return value;
};

export const formatCPF = (value: string) => {
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');

  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return value;
};

export const formatBRPhoneNumber = (value: string) => {
  const digits = !value ? '' : value.replace(/[^\d]/g, '');
  if (!digits || digits.length < 2) return value;
  const cut = digits.length === 10 ? 6 : 7;
  const max = digits.length > 11 ? 11 : digits.length;
  // eslint-disable-next-line prettier/prettier
  return `(${digits.substring(0, 2)}) ${digits.substring(2, cut)}${digits.length >= 7 ? '-' : ''}${digits.substring(cut, max)}`;
};
