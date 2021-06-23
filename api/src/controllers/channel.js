const router = require('express').Router();
const logger = require('debug');

const { verifyToken } = require('../middlewares/verifyToken');
const Channel = require('../../database/models').channel;
const Message = require('../../database/models').message;
const Member = require('../../database/models').member;
const User = require('../../database/models').user;

const debugLog = logger('api:controller:channel');

/**
 * Get All channel that user has subcribe
 */
router.get('/', verifyToken, async (req, res) => {
  const { user } = req;

  try {
    const channelsEntity = await Member.findAll({
      where: { userId: user.id },
      include: { model: Channel },
    });
    const channels = channelsEntity.map((channel) => channel.channel);

    res.status(200).json(channels);
  } catch (e) {
    debugLog(e);
    res.status(500).json({ message: 'error server' });
  }
});

/**
 * Get a channel by id with all information
 */
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const channelEntity = await Channel.findByPk(id, {
      include: [
        {
          model: Message,
          where: { channelId: id },
          attributes: { exclude: ['userId', 'channelId'] },
          include: { model: User, attributes: { exclude: ['password'] } },
        },
        {
          model: Member,
          where: { channelId: id },
          attributes: { exclude: ['userId', 'channelId'] },
          include: { model: User, attributes: { exclude: ['password'] } },
        },
      ],
    });
    const channel = channelEntity.get({ plain: true });

    res.status(200).json({ channel });
  } catch (e) {
    debugLog(e);
    res.status(500).json({ message: 'error server' });
  }
});

module.exports = router;
