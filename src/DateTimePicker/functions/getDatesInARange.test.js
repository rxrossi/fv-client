import getDatesInARange from './getDatesInARange';

describe('getDatesInARange', () => {
  it('works in a simple case', () => {
    const begin = new Date(2017, 11, 1);
    const end = new Date(2017, 11, 3);
    const actual = getDatesInARange(begin, end);
    expect(actual).toEqual([
      new Date(2017, 11, 1),
      new Date(2017, 11, 2),
      new Date(2017, 11, 3),
    ]);
  });

  it('works in a different case', () => {
    const begin = new Date(2017, 10, 26);
    const end = new Date(2018, 0, 6);

    const actual = getDatesInARange(begin, end);
    const expectedNumberOfDays = 7 * 6; // 7 days, 6 weeks (rows)
    expect(actual.length).toEqual(expectedNumberOfDays);
    expect(actual[0]).toEqual(new Date(2017, 10, 26));
    expect(actual[1]).toEqual(new Date(2017, 10, 27));
    expect(actual[40]).toEqual(new Date(2018, 0, 5));
    expect(actual[41]).toEqual(new Date(2018, 0, 6));
  });
});
