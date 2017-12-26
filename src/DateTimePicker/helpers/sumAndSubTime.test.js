import sumAndSubTime from './sumAndSubTime';

describe('sumAndSubTime', () => {
  describe('Sum', () => {
    describe('Hours', () => {
      it('adds an hour to 10:30', () => {
        const actual = sumAndSubTime('10:30', 'h', 'sum');
        expect(actual).toEqual('11:30');
      });

      it('adds an hour to 00:05', () => {
        const actual = sumAndSubTime('00:05', 'h', 'sum');
        expect(actual).toEqual('01:05');
      });

      it('adds an hour to 23:05', () => {
        const actual = sumAndSubTime('23:05', 'h', 'sum');
        expect(actual).toEqual('00:05');
      });
    });

    describe('Minutes', () => {
      it('adds a minute to 10:30', () => {
        const actual = sumAndSubTime('10:30', 'm', 'sum');
        expect(actual).toEqual('10:31');
      });

      it('adds a minute to 00:05', () => {
        const actual = sumAndSubTime('00:05', 'm', 'sum');
        expect(actual).toEqual('00:06');
      });

      it('adds an minute to 23:59', () => {
        const actual = sumAndSubTime('23:59', 'm', 'sum');
        expect(actual).toEqual('23:00');
      });
    });
  });

  describe('Sub', () => {
    describe('Hours', () => {
      it('subtract an hour of 10:30', () => {
        const actual = sumAndSubTime('10:30', 'h', 'sub');
        expect(actual).toEqual('09:30');
      });

      it('subtract an hour of 00:30', () => {
        const actual = sumAndSubTime('00:30', 'h', 'sub');
        expect(actual).toEqual('23:30');
      });
    });

    describe('Minutes', () => {
      it('subtracts a minute of 10:30', () => {
        const actual = sumAndSubTime('10:30', 'm', 'sub');
        expect(actual).toEqual('10:29');
      });

      it('subtracts a minute of 00:05', () => {
        const actual = sumAndSubTime('00:05', 'm', 'sub');
        expect(actual).toEqual('00:04');
      });

      it('subtracts an minute of 00:00', () => {
        const actual = sumAndSubTime('00:00', 'm', 'sub');
        expect(actual).toEqual('00:59');
      });
    });
  });
});
