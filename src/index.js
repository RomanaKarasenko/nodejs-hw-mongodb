import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const bootstrap = async () => {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    setupServer();
};

void bootstrap();
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

