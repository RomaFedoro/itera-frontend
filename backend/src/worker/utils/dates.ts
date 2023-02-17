export const now = () => {
  const date = new Date();
  const fixed = date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

  return new Date(fixed);
};

export const getDatesInRange = (startDate: Date, endDate: Date) => {
  const date = new Date(startDate.getTime());

  date.setDate(date.getDate() + 1);

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
