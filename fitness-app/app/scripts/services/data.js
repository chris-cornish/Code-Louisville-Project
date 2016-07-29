'use strict';

function DataService ($http, $q) {

  this.getExercises = function(cb) {
    $http.get('/api/exercises').then(cb);
  };

  this.deleteExercise = function(exercise) {
    if (!exercise._id) {
      return $q.resolve();
    }
    return $http.delete('/api/exercises/' + exercise._id).then(function() {
      console.log("I deleted the " + exercise.name + " exercise!");
    });
  };

  this.saveExercises = function(exercises) {
    var queue = [];
    exercises.forEach(function(exercise) {
      var request;
      if(!exercise._id) {
        request = $http.post('/api/exercises', exercise);
      } else {
        request = $http.put('/api/exercises/' + exercise._id, exercise).then(function(result) {
          exercise = result.data.exercise;
          return exercise;
        });
      }
      queue.push(request);
    });
    return $q.all(queue).then(function(results) {
      console.log("I saved " + exercises.length + " exercises!");
    });
  };

}

module.exports = DataService;