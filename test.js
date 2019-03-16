const stringify = require('./index.js').stringify;
const hash = require('./index.js').hash;

test('Stringifies basic types', () => {
  expect(stringify(1)).toBe(JSON.stringify(1));
  expect(stringify('hello')).toBe(JSON.stringify('hello'));
  expect(stringify(new Buffer(0))).toBe(JSON.stringify(new Buffer(0)));
  expect(stringify(true)).toBe(JSON.stringify(true));
  expect(stringify([0, 1, 2, 'three'])).toBe(JSON.stringify([0, 1, 2, 'three']));
  expect(stringify({a: 'a', b: 'b'})).toBe(JSON.stringify({a: 'a', b: 'b'}));
  expect(stringify({a: '"a"'})).toBe(JSON.stringify({a: '"a"'}));
});

test('Stringifies nested objects', () => {
  let object = {
    a: {
      b: {
        c: {
          nestedArray: [{
            hi: 'howareyou'
          }, {
            hey: 'whatsup'
          }],
          test: true
        }
      }
    }
  };
  expect(stringify(object)).toBe(JSON.stringify(object));
});

test('Stringifies and hashes objects with different property orders in the same way', () => {
  let object1 = {};
  let object2 = {};
  object1.a = 'a';
  object2.b = 'b';
  object1.b = 'b';
  object2.a = 'a';
  expect(JSON.stringify(object1)).not.toBe(JSON.stringify(object2));
  expect(stringify(object1)).toBe(stringify(object2));
  expect(hash(object1)).toBe(hash(object2));
});

test('Throws an error for an object with a circular reference', () => {
  let object = {};
  object.a = {
    a: 'a'
  };
  object.b = object.a;
  object.a.b = object.b;
  let result;
  try {
    result = JSON.stringify(object);
  } catch (e) {
    expect(e).toBeDefined()
  }
  expect(result).toBeUndefined();
  try {
    result = stringify(object);
  } catch (e) {
    expect(e).toBeDefined();
  }
  expect(result).toBeUndefined();
});