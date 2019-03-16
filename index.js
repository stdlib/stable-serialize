const crypto = require('crypto');

const _stringify = (value) => {
  if (typeof value !== 'object' || Buffer.isBuffer(value)) {
    return JSON.stringify(value);
  } else if (Array.isArray(value)) {
    return '[' + value.map((v) => {
      return _stringify(v);
    }).join(',') + ']';
  } else {
    return '{' + Object.keys(value).sort().map((v) => {
      return `"${v}":${_stringify(value[v])}`;
    }).join(',') + '}';
  }
};

module.exports = {
  stringify: (value) => {
    let successfulJsonStringify = JSON.stringify(value);
    return _stringify(value);
  },
  hash: (value) => {
    let successfulJsonStringify = JSON.stringify(value);
    return crypto.createHash('md5').update(_stringify(value)).digest('hex');
  }
}