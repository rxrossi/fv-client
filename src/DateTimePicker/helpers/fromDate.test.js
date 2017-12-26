import fromDate from './fromDate';

describe('fromDate', () => {
  it('throws if date is invalid', () => {
    expect(() => fromDate()).toThrow();
    expect(() => fromDate('aaa')).toThrow();
    expect(() => fromDate(Date.now())).toThrow();
  });

  it('returns minutes, hours, day, month and year', () => {
    const date = new Date();
    const { minutes } = fromDate(date);
    const { hours } = fromDate(date);
    const { day } = fromDate(date);
    const { month } = fromDate(date);
    const { year } = fromDate(date);

    expect(minutes).toEqual(date.getMinutes());
    expect(hours).toEqual(date.getHours());
    expect(day).toEqual(date.getDate());
    expect(month).toEqual(date.getMonth());
    expect(year).toEqual(date.getFullYear());
  });
});
