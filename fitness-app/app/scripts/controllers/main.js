'use-strict';

function MainCtrl ($scope, dataService) {

    dataService.getExercises(function(response) {
        var exercises = response.data.exercises;
        $scope.exercises = exercises;
    });

    $scope.addExercise = function() {
        $scope.exercises.unshift({
            number: "Exercise Number",
            name: "Exercise Name",
            weight: "Weight Used",
            sets: "Sets Completed",
            reps: "Reps Completed"});
    };
}

module.exports = MainCtrl;