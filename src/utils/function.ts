export const isEmpty = (obj: any) => !Object.keys(obj).length;

export const ommisionText = (text: string, length = 10): string => {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + '...';
};
