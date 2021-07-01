import { validateMessage } from './message';
import { validHankakuEngNum, validEmail } from './regExp';

const { END_MESSAGE, FORMAT, MINI_ENG_NUM, PASSWORD_MESSAGE } = validateMessage;

export const validBlank = {
  check: (value: string): boolean => {
    let isValid = false;
    if (!value) {
      isValid = true;
    }
    return isValid;
  },
  message: (label: string) => label + END_MESSAGE,
};

export const validRange = {
  check: (value: string, minNum: number, maxNum: number): boolean => {
    let isValid = false;
    if ((value.length !== 0 && value.length < minNum) || value.length > maxNum) {
      isValid = true;
    }
    return isValid;
  },
  message: (label: string) => label + PASSWORD_MESSAGE,
};

export const validhankakuEngNum = {
  check: (value: string): boolean => {
    let isValid = false;
    if (!validHankakuEngNum.test(value) && value.length !== 0) {
      isValid = true;
    }
    return isValid;
  },
  message: (label: string) => label + MINI_ENG_NUM + END_MESSAGE,
};

export const validSame = {
  check: (value01: string, value02: string): boolean => {
    let isValid = false;
    if (value01 !== value02) {
      isValid = true;
    }
    return isValid;
  },
  message: (label01: string, label02: string) => `${label01}は${label02}と同じにしてください。`,
};

export const emailFormat = {
  check: (email: string): boolean => {
    let isValid = false;
    if (email && !validEmail.test(email)) {
      isValid = true;
    }
    return isValid;
  },
  message: (label: string) => label + FORMAT,
};
