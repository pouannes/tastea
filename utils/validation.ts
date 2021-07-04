export const isEmpty = (s: string): boolean => s.length === 0;

export const isOnlyNumber = (s: string): boolean => /^\d*$/.test(s);

export const isSmallInt = (s: string): boolean =>
  isOnlyNumber(s) && parseInt(s) > -32767 && parseInt(s) < 32767;
