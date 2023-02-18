export const ONE_DAY = 1000 * 60 * 60 * 24;

export const getOnlyDate = (dateWithTime: Date = new Date()) =>
  new Date(Math.ceil(+dateWithTime / ONE_DAY) * ONE_DAY);

export const addDays = (date: Date, numberDays: number) =>
  new Date(+getOnlyDate(date) + numberDays * ONE_DAY);

export const getSundayThisWeek = (date: Date = new Date()) =>
  addDays(date, (7 - date.getDay()) % 7);
