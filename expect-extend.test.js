
const testFn = jest.fn();

expect.extend({
  optionalFn(fn) {
    const pass = fn === undefined || typeof fn === 'function';
    console.log(`optionalFn: fn:${typeof fn} pass:${pass}`);

    return {
      pass,
      message: () =>
        'fn argument must either be a function or undefined.',
    };
  },
});

describe('expect.extend', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const argObj = {
    id: 1,
    name: 'name'
  };

  const argFn = jest.fn();


  test('handles fn as 2nd argument', () => {
    testFn(argObj, argFn);
    expect(testFn).toHaveBeenCalledWith(
      argObj,
      argFn
    );
  });

  test('handles undefined as 2nd argument', () => {
    testFn(argObj, undefined);
    expect(testFn).toHaveBeenCalledWith(
      argObj,
      undefined
    );
  });

  test('handles fn as 2nd argument via expect', () => {
    testFn(argObj, argFn);
    expect(testFn).toHaveBeenCalledWith(
      argObj,
      expect.optionalFn()
    );
  });

  test('handles undefined as 2nd argument via expect', () => {
    testFn(argObj, undefined);
    expect(testFn).toHaveBeenCalledWith(
      argObj,
      expect.optionalFn()
    );
  });
});