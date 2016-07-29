webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('exerciseListApp', []);

	__webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(7);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('exerciseListApp').service('dataService', __webpack_require__(4));

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('exerciseListApp').directive('exercise', __webpack_require__(6));

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	function NavbarDirective () {
	  return {
	    templateUrl: 'templates/navbar.html',
	    replace: true,
	    controller: 'navbarCtrl'
	  }
	}

	module.exports = NavbarDirective;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('exerciseListApp').controller('mainCtrl', __webpack_require__(8));
	angular.module('exerciseListApp').controller('exerciseCtrl', __webpack_require__(9));

/***/ },
/* 8 */
/***/ function(module, exports) {

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

/***/ },
/* 9 */
/***/ function(module, exports) {

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

/***/ }
]);