/*! Groceries - v0.0.2 - 2013-10-04
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
   * @private
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
  
  /** 
   * Private Methods
   * @private
   */ 
  var privateMethods = {
    /**
     * Remove
     * Remove an item from the store
     */
    remove: function(grocery) {
      localStorageService.remove(grocery.title);
      $scope.groceries = privateMethods.getGroceries();
    },
    /**
     * Update
     * Update an item in the store
     *
     * @param {Grocery} grocery - The object to update
     */
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
    /**
     * Save
     * Save an item to the store
     * 
     * @param {string} title - The title of the item to save
     */
    save: function(title) {
      console.log('groceryController.list().save()', title);
      var grocery = new Grocery(title);
      localStorageService.set(title, grocery);
      $scope.groceries.push(grocery);
      $scope.groceries = privateMethods.getGroceries();
      return null;
    },
    /**
     * getGroceries
     * Get all of the items from the store
     */
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
   * Public Methods
   * @public
   */
  var publicMethods = {
    /** 
     * Create
     * Create new Todo Item
     */
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
var Grocery = function(title) {
  this.title = title;
  this.checked = false;
}
app.config(['$routeProvider', function($routeProvider) {
  console.log('router.config()');
  $routeProvider
  .when('/', {
    templateUrl: '../views/list.html',
    controller: 'groceryController',
    action: 'list',
  })
  .when('/new', {
    templateUrl: '../views/new.html',
    controller: 'groceryController',
    action: 'add',
  })
  .when('/view/:entityId', {
    templateUrl: '../views/view.html',
    controller: 'groceryController',
    action: 'view',
  })
  .otherwise({ 
    redirectTo: '/',
  });
}]);
angular.module('Grocery').run(['$templateCache', function($templateCache) {

  $templateCache.put('views/list.html',
    "<div class=\"topcoat-navigation-bar\"><div class=\"topcoat-navigation-bar__item center full\"><h1 class=\"topcoat-navigation-bar__title\">List</h1></div></div><div class=\"topcoat-list\"><ul class=\"topcoat-list__container\"><li class=\"topcoat-list__item\"><form ng-submit=\"new_grocery = save(new_grocery)\"><input style=\"width: 80%\" class=\"topcoat-text-input\" placeholder=\"Grocery...\" ng-model=\"new_grocery\"><button style=\"width: 18%; margin-left: 1%\" class=\"topcoat-button\">Add</button></form></li><li class=\"topcoat-list__item\" ng-repeat=\"grocery in groceries\" ng-init=\"isEdit=false\" ng-model=\"isEdit\" ng-click=\"isEdit=!isEdit\" ng-swipe-left=\"isEdit=!isEdit\"><label class=\"topcoat-checkbox\"><input type=\"checkbox\" ng-model=\"grocery.checked\" ng-change=\"update(grocery)\"><div id=\"button_add\" class=\"topcoat-checkbox__checkmark\"></div></label>{{grocery.title}}<div ng-show=\"isEdit\" class=\"edit-bar\"><div class=\"topcoat-button-bar\"><div class=\"topcoat-button-bar__item\"><button class=\"topcoat-button-bar__button\" ng-click=\"remove(grocery)\">Delete</button></div></div></div></li></ul></div><pre ng-show=\"DEBUG\">\n" +
    "new_grocery = {{new_grocery|json}};\n" +
    "groceries = {{groceries|json}};\n" +
    "</pre>"
  );


  $templateCache.put('views/new.html',
    "<h1>New</h1>"
  );


  $templateCache.put('views/view.html',
    "<h1>View</h1>"
  );

}]);
