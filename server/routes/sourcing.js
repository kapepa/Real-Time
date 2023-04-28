let express = require('express');
let router = express.Router();
let events = require('events');
let eventEmitter = new events.EventEmitter();
let listMessage = [];

//express js event  server send event
router.get('/connect', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive');

  eventEmitter.on('sendMessages', (data) => {
    res.status(200).write(`data: ${JSON.stringify(data)} \n\n`);
  })
})

router.post('/new-message', (req, res) => {
  listMessage.unshift(req.body);
  eventEmitter.emit('sendMessages', req.body);
  res.status(200);
})

module.exports = router;