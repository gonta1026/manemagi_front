import { validateMessage } from './message';
import { validHankakuEngNum, validEmail } from './regExp';

const { END_MESSAGE, FORMAT, MINI_ENG_NUM, PASSWORD_MESSAGE } = validateMessage;

export const blankCheckMessage = (value: string, labelName: string): string => {
  let message = '';
  if (!value) {
    message = labelName + END_MESSAGE;
  }
  return message;
};

export const emailFormatCheckMessage = (email: string, labelName: string): string => {
  let message = '';
  if (email && !validEmail.test(email)) {
    message = labelName + FORMAT;
  }
  return message;
};

export const sameCheckMessage = (
  value01: string,
  valueLabel01: string,
  value02: string,
  value02Label: string,
): string => {
  let message = '';
  if (value01 !== value02) {
    message = valueLabel01 + 'は' + value02Label + 'と同じにしてください。';
  }
  return message;
};

export const rangeCheckMessage = (
  value: string,
  labelName: string,
  minNum: number,
  maxNum: number,
): string => {
  let message = '';
  if ((value.length !== 0 && value.length < minNum) || value.length > maxNum) {
    message = labelName + PASSWORD_MESSAGE;
  }
  return message;
};

export const hankakuEngNumCheckMessage = (value: string, labelName: string): string => {
  let message = '';
  if (!validHankakuEngNum.test(value) && value.length !== 0) {
    message = labelName + MINI_ENG_NUM + END_MESSAGE;
  }
  return message;
};
