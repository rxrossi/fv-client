import getLastWeekDay from './getLastWeekDay.js';

describe('getLastWeekDay', () => {
  it('works for December 2017', () => {
    // 0 is january
    const actual = getLastWeekDay(11, 2017);
    const expected = new Date(2018, 0, 6);
    expect(actual).toEqual(expected);
  });
});
