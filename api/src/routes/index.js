const router = require('express').Router();
const authenticate = require('../controllers/authenticate');
const channel = require('../controllers/channel');

/** Route authentication */
router.use('/authenticate', authenticate);
router.use('/channel', channel);

module.exports = router;
