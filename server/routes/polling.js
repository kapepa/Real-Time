let express = require('express');
let router = express.Router();
let events = require('events');
let eventEmitter = new events.EventEmitter();
let listMessage = []

router.get('/get-message', (req, res, ) => {
  eventEmitter.once('sendMessages', (data) => {
    res.status(200).json(data);
  })
})

router.post('/new-message', (req, res) => {
  listMessage.unshift(req.body)
  eventEmitter.emit('sendMessages', req.body);
  res.status(200);
})

module.exports = router