(function(angular) {
	'use strict';
angular.module('myApp', [])
.controller('mainController', ['$http', function($http) {
	var self = this;
	self.eligId='';
	self.environment='';
	self.batches='';
	self.note='';
	self.started='false';
	self.done='false';
	//	self.request.userId = 'user0';
	self.envs = ['QA', 'QA1', 'DEV', 'DEV1', 'INT', 'INT1', 'TT3', 'TRN'];
//	resuest.username='user0';
/*	self.request.started=false;
	self.request.done=false;
	self.request.getDatetime = function() {
  	return (new Date).toLocaleFormat("%A, %B %e, %Y");
	};
*/	

	self.list = [];
	
	
	$http.get('/requests').then(function(response) {
        self.list = response.data;
      }, function(errResponse) {
        console.error('Error while fetching notes');
  });
	
	var fetchTodos = function() {
        return $http.get('/requests').then(
            function(response) {
          self.list = response.data;
        }, function(errResponse) {
          console.error('Error while fetching notes');
        });
      };
	
	fetchTodos();


	
	self.add = function() {
		var request = {};
		request.eligId=self.eligId;
		request.environment=self.environment;
		request.batches=self.batches;
		request.note=self.note;	
		request.started=self.started;
		request.done=self.done;
		
			 $http.post('/requests', request)
            .then(fetchTodos)
            .then(function(response) {
              request = null;
            });
            self.eligId='';
	self.environment='';
	self.batches='';
	self.note='';
	};
	
}]);
})(window.angular);