angular.module('Grocery').run(['$templateCache', function($templateCache) {

  $templateCache.put('views/list.html',
    "<div class=\"topcoat-navigation-bar\"><div class=\"topcoat-navigation-bar__item center full\"><h1 class=\"topcoat-navigation-bar__title\">Groceries</h1></div></div><div class=\"topcoat-list\"><ul class=\"topcoat-list__container\"><li class=\"topcoat-list__item\"><form ng-submit=\"new_grocery = save(new_grocery)\"><input style=\"width: 80%\" class=\"topcoat-text-input\" placeholder=\"Grocery...\" ng-model=\"new_grocery\"><button style=\"width: 18%; margin-left: 1%\" class=\"topcoat-button\">Add</button></form></li><li class=\"topcoat-list__item\" ng-repeat=\"grocery in groceries\" ng-init=\"isEdit=false\" ng-model=\"isEdit\" ng-click=\"isEdit=!isEdit\" ng-swipe-left=\"isEdit=!isEdit\"><label class=\"topcoat-checkbox\"><input type=\"checkbox\" ng-model=\"grocery.checked\" ng-change=\"update(grocery)\"><div class=\"topcoat-checkbox__checkmark\"></div></label><span class=\"title\">{{grocery.title}}</span><div ng-show=\"isEdit\" class=\"edit-bar\"><button class=\"topcoat-button--cta topcoat_button--cta-delete\" ng-click=\"remove(grocery)\">Delete</button></div></li></ul></div><pre ng-show=\"DEBUG\">\n" +
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
