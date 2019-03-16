const crypto = require('crypto');

const stringify = (value) => {
  if (typeof value !== 'object' || Buffer.isBuffer(value)) {
    return JSON.stringify(value);
  } else if (Array.isArray(value)) {
    return '[' + value.map((v) => {
      return stringify(v);
    }).join(',') + ']';
  } else {
    return '{' + Object.keys(value).sort().map((v) => {
      return `"${v}":${stringify(value[v])}`;
    }).join(',') + '}';
  }
};

module.exports = {
  stringify: (value) => {
    return stringify(value);
  },
  hash: (value) => {
    return crypto.createHash('md5').update(stringify(value)).digest('hex');
  }
}