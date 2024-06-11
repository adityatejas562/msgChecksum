const net = require('net');
const User = require('../models/User');

const handleRequest = async (data, socket) => {
  const { action, payload } = JSON.parse(data.toString());
  let response;
  try {
    switch (action) {
      case 'create':
        const newUser = new User(payload);
        await newUser.save();
        response = { status: 'success', data: newUser };
        break;
      case 'update':
        const updatedUser = await User.findByIdAndUpdate(payload.id, payload, { new: true, runValidators: true });
        response = { status: 'success', data: updatedUser };
        break;
      case 'retrieve':
        const user = await User.findById(payload.id);
        response = { status: 'success', data: user };
        break;
      default:
        response = { status: 'error', message: 'Invalid action' };
    }
  } catch (error) {
    response = { status: 'error', message: error.message };
  }
  socket.write(JSON.stringify(response));
};

const startTCPServer = () => {
  const server = net.createServer((socket) => {
    socket.on('data', (data) => handleRequest(data, socket));
  });

  server.listen(process.env.TCP_PORT, () => {
    console.log(`TCP Server listening on port ${process.env.TCP_PORT}`);
  });
};

module.exports = startTCPServer;
