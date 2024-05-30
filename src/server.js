const express = require('express');
const cors = require('cors');
const pino = require('pino');

const logger = pino({ level: 'info' });

function setupServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  // Handle non-existent routes
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Get the port from environment variables or default to 3000
  const port = process.env.PORT || 3000;

  // Start the server
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
}

module.exports = setupServer;



