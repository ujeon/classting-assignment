import { HhMmSs } from '@store/modules/quiz/reducer';

export const convertMilliToHhMmSs = (milliseconds: number): HhMmSs => {
  return {
    hh: Math.floor(milliseconds / (1000 * 60 * 60)).toString(),
    mm: (Math.floor(milliseconds / (1000 * 60)) % 60).toString(),
    ss: (Math.floor(milliseconds / 1000) % 60).toString(),
  };
};

export const decodeHtmlEntity = (string: string): string =>
  string.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
