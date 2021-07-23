import {
  registerdColumn,
  format,
  notSame,
  hankakuEngNum,
  passwordRangeAndHankakuEngNum,
  blank,
} from './message';
import { validHankakuEngNum, validEmail } from './regExp';

export const validBlank = {
  check: (value: string): boolean => isValidCheck(value === ''),
  message: (label: string) => blank(label),
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
