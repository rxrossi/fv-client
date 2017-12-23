import getFullWeeksForAMonth from './getFullWeeksForAMonth';

describe('getFullWeeksForAMonth', () => {
  it('returns the correct array in for December 2017', () => {
    const actual = getFullWeeksForAMonth(11, 2017); // 0, 2017 is january

    const NUMBER_OF_WEEKS_DECEMBER_2017 = 6;

    expect(actual.length).toBe(NUMBER_OF_WEEKS_DECEMBER_2017 * 7);
  });
});
