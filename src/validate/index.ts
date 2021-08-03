import {
  registerdColumn,
  format,
  notSame,
  hankakuEngNum,
  passwordRangeAndHankakuEngNum,
  blank,
  maxNum,
} from './message';
import { validHankakuEngNum, validEmail } from './regExp';

export const validBlank = {
  // できればnull自体を許容しないようにしたい。
  check: (value: string | number | Date | null): boolean =>
    isValidCheck(value === '' || value === null),
  message: (label: string) => blank(label),
};
export const validMaxNum = {
  check: (value: string, num: number): boolean => isValidCheck(value.length > num),
  message: (label: string, num: number) => maxNum(label, num),
};

export const validRange = {
  check: (value: string, minNum: number, maxNum: number): boolean =>
    isValidCheck((value.length !== 0 && value.length < minNum) || value.length > maxNum),
  message: (label: string) => passwordRangeAndHankakuEngNum(label),
};

export const validhankakuEngNum = {
  check: (value: string): boolean =>
    isValidCheck(!validHankakuEngNum.test(value) && value.length !== 0),
  message: (label: string) => hankakuEngNum(label),
};

export const validNotSame = {
  check: (value01: string, value02: string): boolean => isValidCheck(value01 !== value02),
  message: (label01: string, label02: string) => notSame(label01, label02),
};

export const emailFormat = {
  check: (email: string): boolean => isValidCheck(email !== '' && !validEmail.test(email)),
  message: (label: string) => format(label),
};

export const validRegisterdName = {
  check: (name: string, shopNames: string[]): boolean => {
    const shopNameExists = shopNames.some((shopName) => shopName === name);
    return isValidCheck(shopNameExists);
  },
  message: (name: string, label: string) => registerdColumn(name, label),
};

const isValidCheck = (targetFormula: boolean): boolean => {
  let isValid = false;
  if (targetFormula) {
    isValid = true;
  }
  return isValid;
};
