import {
  registerdColumn,
  format,
  notSame,
  hankakuEngNum,
  passwordRangeAndHankakuEngNum,
  blank,
  maxNum,
  minNumPrice,
} from './message';
import { validHankakuEngNum, validEmail } from './regExp';
import { isBooleanCheck } from '../utils/function';

/*********
 * maxNum
 * *******/
export const validNum = {
  MAX_50: 50,
  MAX_100: 100,
  MAX_150: 150,
  MAX_255: 255,
  MAX_300: 300,
  MIN_10: 10,
} as const;

/*********
 * validation
 * *******/
export const validBlank = {
  // できればnull自体を許容しないようにしたい。
  check: (value: string | number | Date | null): boolean =>
    isBooleanCheck(value === '' || value === null),
  message: (label: string) => blank(label),
};

export const validMaxNum = {
  check: (value: string | null, num: number): boolean => {
    if (value === null) return false;
    return isBooleanCheck(value.length > num);
  },
  message: (label: string, num: number) => maxNum(label, num),
};

export const validMinNum = {
  check: (value: number | null, minNum: number): boolean => {
    if (value === null) return false;
    console.log(value);
    return isBooleanCheck(value < minNum);
  },
  message: (label: string, num: number) => minNumPrice(label, num),
};

export const validRange = {
  check: (value: string, minNum: number, maxNum: number): boolean =>
    isBooleanCheck((value.length !== 0 && value.length < minNum) || value.length > maxNum),
  message: (label: string) => passwordRangeAndHankakuEngNum(label),
};

export const validhankakuEngNum = {
  check: (value: string): boolean =>
    isBooleanCheck(!validHankakuEngNum.test(value) && value.length !== 0),
  message: (label: string) => hankakuEngNum(label),
};

export const validNotSame = {
  check: (value01: string, value02: string): boolean => isBooleanCheck(value01 !== value02),
  message: (label01: string, label02: string) => notSame(label01, label02),
};

export const emailFormat = {
  check: (email: string): boolean => isBooleanCheck(email !== '' && !validEmail.test(email)),
  message: (label: string) => format(label),
};

export const validRegisterdName = {
  check: (name: string, shopNames: string[]): boolean => {
    const shopNameExists = shopNames.some((shopName) => shopName === name);
    return isBooleanCheck(shopNameExists);
  },
  message: (name: string, label: string) => registerdColumn(name, label),
};
