//Verifica se o nome é maior do que o tamanho desejado
export const checkName = (name: string, size: number) => {
  if (name.length < size) return name;

  return `${name.slice(0, size)}...`;
};
