import getFirstWeekDay from './getFirstWeekDay';

describe('getFirstWeekDay', () => {
  it('works for December 2017', () => {
    const actual = getFirstWeekDay(11, 2017);
    const expected = new Date(2017, 11 - 1, 26);
    expect(actual).toEqual(expected);
  });
});
