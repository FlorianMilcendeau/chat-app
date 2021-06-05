const express = require('express');
const logger = require('morgan');

const compression = require('compression');
const helmet = require('helmet');
const debug = require('debug');
const http = require('http');

const { verifyToken } = require('./middlewares/verifyToken');

const PORT = process.env.PORT || 8000;
const app = express();
const debugLog = debug('api');
const server = http.createServer(app);
const root = require('./routes');
const socket = require('./socket');

app.use(express.json());
app.use(logger('dev'));
app.use(helmet());
app.use(compression());

socket(server);

/** Main Route */
app.use('/api', root);

/** Test middleware token */
app.get('/api/test', verifyToken, (req, res) => {
  res.status(200).json(req.user);
});

server.listen(PORT, (err) => {
  if (err) {
    debugLog(err);
  } else {
    debugLog(`Express server listening on ${PORT}`);
  }
});
