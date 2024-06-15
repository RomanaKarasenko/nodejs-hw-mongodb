import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

// const bootstrap = async () => {
//   await initMongoConnection();
//   setupServer();
// };
// bootstrap();

// IIFE
// (async () => {
//   await initMongoConnection();
//   setupServer();
// })();

// In ES6 modules you can use await on the top level, so separate function is redundant
await initMongoConnection();
setupServer();
