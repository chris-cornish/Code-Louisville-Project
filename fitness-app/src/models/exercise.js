'use strict';

var mongoose = require('mongoose');

// exercise.number
// exercise.name
// exercise.weight
// exercise.sets
// exercise.reps

var exerciseSchema = new mongoose.Schema({
    number: String,
    name: String,
    weight: String,
    sets: String,
    reps: String
});

var model = mongoose.model('Exercise', exerciseSchema);

module.exports = model;
