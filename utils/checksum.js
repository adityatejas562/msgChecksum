const crypto = require('crypto');

const generateChecksum = (data) => {
  return crypto.createHash('md5').update(data).digest('hex');
};

const verifyChecksum = (data, checksum) => {
  const generatedChecksum = generateChecksum(data);
  return generatedChecksum === checksum;
};

module.exports = { generateChecksum, verifyChecksum };
