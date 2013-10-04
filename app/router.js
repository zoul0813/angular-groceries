/** The angular router class */
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