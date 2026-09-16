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
    return `[${value.map((item, index) => serialize(item, `${location}[${index}]`)).join(',')}]`;
  }

  if (typeof value === 'object') {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError(`Non-JSON-safe object at ${location}`);
    }

    return `{${Object.keys(value).sort().map(key => (
      `${JSON.stringify(key)}:${serialize(value[key], `${location}.${key}`)}`
    )).join(',')}}`;
  }

  throw new TypeError(`Non-JSON-safe value at ${location}`);
}

function hashCanonical(value) {
  return `sha256:${crypto.createHash('sha256').update(canonicalize(value)).digest('hex')}`;
}

module.exports = { canonicalize, hashCanonical };
