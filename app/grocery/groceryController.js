/** 
 * The Todo Controller
 * @module groceryController
 * 
 * @requires $scope
 * @requires $route
 * @requires $routeParams
 */
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