var express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');
var router = express.Router();

// GET
router.get('/', (req, res, next) => {
  Message.find()
  .then(messages => {
    res.status(200).json({
      message: 'Messages fetched successfully!',
      messages: messages
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  });
});

// POST
router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText
  });

  message.save()
    .then(createdMessage => {
      res.status(201).json({
      message: 'Message added successfully',
      messages: createdMessage
      });
    })
    .catch(error => {
        res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// PUT
router.put('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      message.subject = req.body.subject,
      message.msgText = req.body.msgText

      Message.updateOne({ id: req.params.id }, message)
        .then(result => {
          res.status(204).json({
            message: 'Message updated successfully',
            messages: result
          })
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: { message: 'Message not found'}
      });
    });
});

// DELETE
router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      Message.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Message deleted successfully",
            messages: result
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: { message: 'Message not found'}
      });
    });
});

module.exports = router;