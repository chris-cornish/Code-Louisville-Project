'use strict';

var Exercise = require('./models/exercise');

var exercises = [
"test", "test2"
];

// exercises.forEach(function (exercise, index) {
//   Exercise.find({ 'number' : exercise, 'name': exercise, 'weight' : exercise, 'sets' : exercise, 'reps' : exercise }, function(err, exercises) {
//     if (!err && !exercises.exercise) {
//       Exercise.create({ number: exercise, name: exercise, weight:exercise, sets: exercise, reps: exercise });
//     }
//   });
// });