import getWeeks from './index';

describe('getWeeks', () => {
  it('returns the correct array in for December 2017', () => {
    const actual = getWeeks(11, 2017); // 0, 2017 is january

    const NUMBER_OF_DAYS_TO_SHOW_IN_DECEMBER_2017 = 42;

    expect(actual.length).toBe(NUMBER_OF_DAYS_TO_SHOW_IN_DECEMBER_2017);
  });
});
