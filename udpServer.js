const dgram = require('dgram');
const { verifyChecksum } = require('./utils/checksum');

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  const message = JSON.parse(msg.toString());
  const { data, checksum } = message;

  if (verifyChecksum(data, checksum)) {
    console.log(`Received valid message: ${data}`);
  } else {
    console.log('Received corrupted message');
  }
});

server.on('error', (err) => {
  console.error(`Server error:\n${err.stack}`);
  server.close();
});

server.bind(41234, () => {
  console.log('UDP server listening on port 41234');
});
