angular.module('OWMApp', ['ngRoute'])
  .value('owmCities', ['New York', 'Dallas', 'Chicago'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
      templateUrl : 'home.html',
      controller : 'HomeCtrl',
      controllerAs: 'vm'
    }).when('/cities/:city', {
      templateUrl : 'city.html',
      controller : 'CityCtrl',
      controllerAs: 'vm',
      resolve : {
        city: function(owmCities, $route, $location) {
          var city = $route.current.params.city;
          if(owmCities.indexOf(city) === -1 ) {
            $location.path('/error');
            return;
          }
          return city;
        }
      }
    }).when('/error', {
      template : '<p>Error - Page Not Found</p>'
    })
  }])
  .controller('HomeCtrl', [function() {
      //empty for now
  }])
  .controller('CityCtrl', ['$routeParams', function($routeParams) {
    const vm = this;
    vm.city = $routeParams.city;
  }]);
