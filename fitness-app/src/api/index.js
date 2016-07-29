'use strict';

var express = require('express');
var Exercise = require('../models/exercise');

var router = express.Router();

router.get('/exercises', function(req, res) {
  Exercise.find({}, function(err, exercises) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ exercises: exercises });
  });
});

router.post('/exercises', function(req, res) {
  var exercise = req.body;
  Exercise.create(exercise, function(err, exercise) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'exercise': exercise, message: 'Exercise Created' });
  });
});

router.put('/exercises/:id', function(req, res) {
  var id = req.params.id;
  var exercise = req.body;
  if (exercise && exercise._id !== id) {
    return res.status(500).json({ err: "Ids don't match!" });
  }
  Exercise.findByIdAndUpdate(id, exercise, {new: true}, function(err, exercise) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'exercise': exercise, message: 'Exercise Updated' });
  });
});

router.delete('/exercises/:id', function(req, res) {
  var id = req.params.id;
  Exercise.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Exercise Deleted' });
  });
});

module.exports = router;