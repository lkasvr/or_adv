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
