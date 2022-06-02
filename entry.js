const next = require('next');
const express = require('express');
const { createServer } = require('http');
const startUpdateSchedule = require('./db/lib/updateDB');

(async () => {
  const isDev = process.env.NODE_ENV_NOW !== 'production';

  const port = 23456;
  const nextApp = next({ dev: isDev });
  const nextHandler = nextApp.getRequestHandler();

  await nextApp.prepare();

  const expressApp = express();
  const expressServer = createServer(expressApp);

  // To handle other Next.js routing
  expressApp.all('*', (req, res) => {
    return nextHandler(req, res)
  });

  expressServer.listen(port, () => console.log(`Server deployed on port ${port} at ${new Date()}`));

  startUpdateSchedule();
})();