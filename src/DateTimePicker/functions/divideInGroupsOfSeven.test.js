import divideInGroupsOfSeven from './divideInGroupsOfSeven';

describe('divideInGroupsOfSeven', () => {
  it('works for a basic case', () => {
    const testArray = [
      1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 11, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
    ];

    const expected = [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 11, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
    ];

    const actual = divideInGroupsOfSeven(testArray);

    expect(actual.length).toEqual(3);
    expect(actual).toEqual(expected);
  });
});
