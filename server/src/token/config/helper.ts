export enum Units {
  second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24,
}

export const getTimeInMilliseconds = (unit: keyof typeof Units, amount: number) => {
  return Units[unit] * amount;
}