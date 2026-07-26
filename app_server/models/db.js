const mongoose = require('mongoose');
const readLine = require('readline');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Build the connection and allow MongoDB time to start.
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI), 1000);
};

// Monitor connection events.
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows-specific listener.
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

// Graceful shutdown.
const gracefulShutdown = (message) => {
  mongoose.connection.close().then(() => {
    console.log(`Mongoose disconnected through ${message}`);
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart').then(() => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination').then(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown').then(() => {
    process.exit(0);
  });
});

// Make the initial database connection.
connect();

// Import the Mongoose schema.
require('./travlr');

module.exports = mongoose;