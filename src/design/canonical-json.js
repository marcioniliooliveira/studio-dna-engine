const crypto = require('node:crypto');

function canonicalize(value) {
  return serialize(value, '$');
}

function serialize(value, location) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') {
    return JSON.stringify(value);
  }

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new TypeError(`Non-JSON-safe number at ${location}`);
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    assertSafeArray(value, location);
    return `[${Array.prototype.map.call(value, (item, index) => serialize(item, `${location}[${index}]`)).join(',')}]`;
  }

  if (typeof value === 'object') {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError(`Non-JSON-safe object at ${location}`);
    }

    const keys = ownEnumerableDataKeys(value, location);
    return `{${keys.sort().map(key => (
      `${JSON.stringify(key)}:${serialize(Object.getOwnPropertyDescriptor(value, key).value, `${location}.${key}`)}`
    )).join(',')}}`;
  }

  throw new TypeError(`Non-JSON-safe value at ${location}`);
}

function ownEnumerableDataKeys(value, location) {
  const keys = Reflect.ownKeys(value);
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (typeof key !== 'string' || !descriptor.enumerable || !Object.hasOwn(descriptor, 'value')) {
      throw new TypeError(`Non-JSON-safe property at ${location}`);
    }
  }
  return keys;
}

function assertSafeArray(value, location) {
  if (Object.getPrototypeOf(value) !== Array.prototype) {
    throw new TypeError(`Non-JSON-safe array at ${location}`);
  }
  const keys = Reflect.ownKeys(value);
  for (const key of keys) {
    if (key === 'length') continue;
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    const index = Number(key);
    if (
      typeof key !== 'string' || !descriptor.enumerable || !Object.hasOwn(descriptor, 'value') ||
      !Number.isInteger(index) || index < 0 || String(index) !== key || index >= value.length
    ) {
      throw new TypeError(`Non-JSON-safe property at ${location}`);
    }
  }
  for (let index = 0; index < value.length; index += 1) {
    if (!Object.hasOwn(value, index)) throw new TypeError(`Non-JSON-safe array hole at ${location}[${index}]`);
  }
}

function hashCanonical(value) {
  return `sha256:${crypto.createHash('sha256').update(canonicalize(value)).digest('hex')}`;
}

module.exports = { canonicalize, hashCanonical };
