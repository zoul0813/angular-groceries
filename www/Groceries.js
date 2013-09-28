/*! Groceries - v0.0.1 - 2013-09-28
* Copyright (c) 2013 ; Licensed  */
var pgApp = {
  /** Initialize the app */
  initialize: function() {
    this.bindEvents();
  },
  /** Bind Event Listeners
   *
   * Bind any events that are required on startup. Common events are:
   * 'load', 'deviceready', 'offline', and 'online'.
   */
  bindEvents: function() {
    if('device' in window) {
      document.addEventListener("deviceready", this.onDeviceReady, false);
    } else {
      this.onDeviceReady();
    }
  },
  /** deviceready Event Handler
   *
   * The scope of 'this' is the event. In order to call the 'receivedEvent'
   * function, we must explicity call 'app.receivedEvent(...);'
   */
  onDeviceReady: function() {
    angular.bootstrap(document, ['SampleApp']);
  },  
}

app = angular.module('SampleApp', ['LocalStorageModule', 'ngMobile', ]);

/** The main angular config object */
app.config(function ($compileProvider){
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});
app.controller('groceryController', function($scope, $route, $routeParams, localStorageService) {
  /** 
   * The main render method
   * Determines the current action and calls the appropriate method 
   * @protected
   */
  function render() {
    var currentAction = $route.current.action || 'list';
    switch(currentAction) {
      case 'add': {
        create();
      } break;
      case 'view': {
        view($routeParams.entityId);
      } break
      default: {
        list();
      } break;
    }
  }
  
  /** 
   * Create
   * Create new Todo Item
   */
  function create() {
    console.log('groceryController.create()');
    $scope.grocery = {};
    $scope.save = function() {
      console.log('$scope.grocery', $scope.grocery);
      localStorageService.add($scope.grocery.title, $scope.grocery.description);
    }
  }

  /**
   * View
   * View a specific Todo Entity
   *
   * @param {number} entityId - The ID of the Todo Entity to View
   */
  function view(entityId) {
    console.log('groceryController.view()', entityId);
    $scope.entityId = entityId;
  }
  /**
   * List
   * List all entities
   */
  function list() {
    console.log('groceryController.list()');
  }

  render(); // always call render!!!
});
app.config(['$routeProvider', function($routeProvider) {
  console.log('router.config()');
  $routeProvider
  .when('/', {
    templateUrl: 'views/list.html',
    controller: 'groceryController',
    action: 'list',
  })
  .when('/todo/new', {
    templateUrl: 'views/new.html',
    controller: 'groceryController',
    action: 'add',
  })
  .when('/todo/:entityId', {
    templateUrl: 'views/view.html',
    controller: 'groceryController',
    action: 'view',
  })
  .otherwise({ 
    redirectTo: '/',
  });
}]);