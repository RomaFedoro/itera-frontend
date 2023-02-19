type TDeclension = 0 | 1 | 2;

type TDaysOfWeekData = {
  value: Day;
  label: string;
  declensionCode: TDeclension;
};

export const DAYS_OF_WEEK: TDaysOfWeekData[] = [
  {
    value: 1,
    label: 'пн',
    declensionCode: 0,
  },
  {
    value: 2,
    label: 'вт',
    declensionCode: 0,
  },
  {
    value: 3,
    label: 'ср',
    declensionCode: 1,
  },
  {
    value: 4,
    label: 'чт',
    declensionCode: 0,
  },
  {
    value: 5,
    label: 'пт',
    declensionCode: 1,
  },
  {
    value: 6,
    label: 'сб',
    declensionCode: 1,
  },
  {
    value: 0,
    label: 'вс',
    declensionCode: 2,
  },
];

export const EVERY_DAY_DATA: Record<TDeclension, string> = {
  0: 'Каждый',
  1: 'Каждую',
  2: 'Каждое',
};
