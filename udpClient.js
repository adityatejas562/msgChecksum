const dgram = require('dgram');
const { generateChecksum } = require('./utils/checksum');

const client = dgram.createSocket('udp4');

const sendMessage = (message) => {
  const checksum = generateChecksum(message);
  const payload = JSON.stringify({ data: message, checksum });

  client.send(payload, 41234, 'localhost', (err) => {
    if (err) {
      console.error('Error sending message', err);
    } else {
      console.log('Message sent');
    }
  });
};

sendMessage('Hello, this is a reliable message');
