'use strict';

function ExerciseCtrl ($scope, dataService) {

  $scope.deleteExercise = function(exercise, index) {
    dataService.deleteExercise(exercise).then(function() {
      $scope.exercises.splice(index, 1);
    });
  };

  $scope.saveExercises = function() {
    var filteredExercises = $scope.exercises.filter(function(exercise){
      if(exercise.edited) {
        return exercise
      };
    })
    dataService.saveExercises(filteredExercises)
      .finally($scope.resetExerciseState());
  };

  $scope.resetExerciseState = function() {
      $scope.exercises.forEach(function(exercise) {
         exercise.edited = false;
      });
  }
}

module.exports = ExerciseCtrl;