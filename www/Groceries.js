/*! Groceries - v0.0.1 - 2013-09-28
* Copyright (c) 2013 David Higgins <higginsd@zoulcreations.com>;
 Licensed MIT */
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
    angular.bootstrap(document, ['Grocery']);
  },  
}

app = angular.module('Grocery', ['LocalStorageModule', 'ngMobile', ]);

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
        publicMethods.create();
      } break;
      case 'view': {
        publicMethods.view($routeParams.entityId);
      } break
      default: {
        publicMethods.list();
      } break;
    }
  }
  
  var privateMethods = {
    remove: function(grocery) {
      localStorageService.remove(grocery.title);
      $scope.groceries = privateMethods.getGroceries();
    },
    update: function(grocery) {
      console.log('groceryController.list().update()', grocery);
      var d = localStorageService.get(grocery.title);
      if(d) {
        d.title = grocery.title;
        d.checked = grocery.checked;
      };
      localStorageService.remove(grocery.title);
      localStorageService.add(grocery.title, grocery);
      $scope.groceries = privateMethods.getGroceries();
    },
    save: function(title) {
      console.log('groceryController.list().save()', title);
      var grocery = {
        title: title,
        checked: false,
      };
      localStorageService.set(title, grocery);
      $scope.groceries.push(grocery);
      $scope.groceries = privateMethods.getGroceries();
      return null;
    },
    getGroceries: function() {
      var groceries = [];
      var keys = localStorageService.keys();
      for(var lcv = 0; lcv < keys.length; lcv++) {
        var grocery = localStorageService.get(keys[lcv]);
        groceries.push(grocery);
      }
      return groceries;
    }
  }
  
  /** 
   * Create
   * Create new Todo Item
   */
  var publicMethods = {
    create: function() {
      console.log('groceryController.create()');
      $scope.grocery = {};
      $scope.save = function() {
        console.log('$scope.grocery', $scope.grocery);
        localStorageService.add($scope.grocery.title, $scope.grocery.description);
      }
    },

    /**
     * View
     * View a specific Todo Entity
     *
     * @param {number} entityId - The ID of the Todo Entity to View
     */
    view: function(entityId) {
      console.log('groceryController.view()', entityId);
      $scope.entityId = entityId;
    },
    /**
     * List
     * List all entities
     */
    list: function() {
      console.log('groceryController.list()');
      $scope.groceries = privateMethods.getGroceries();
      $scope.remove = privateMethods.remove;
      $scope.update = privateMethods.update;
      $scope.save = privateMethods.save;
    },
  };

  render(); // always call render!!!
  return publicMethods;
});
app.config(['$routeProvider', function($routeProvider) {
  console.log('router.config()');
  $routeProvider
  .when('/', {
    templateUrl: 'views/list.html',
    controller: 'groceryController',
    action: 'list',
  })
  .when('/new', {
    templateUrl: 'views/new.html',
    controller: 'groceryController',
    action: 'add',
  })
  .when('/view/:entityId', {
    templateUrl: 'views/view.html',
    controller: 'groceryController',
    action: 'view',
  })
  .otherwise({ 
    redirectTo: '/',
  });
}]);