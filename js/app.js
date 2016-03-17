// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ui.router',
  'phonecatControllers',
  'templateservicemod',
  'navigationservice'
]);

firstapp.filter('capitalize', function() {
  return function(input, all) {
    var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
    return (!!input) ? input.replace(reg, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }) : '';
  };
});

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  // for http request with session
  $httpProvider.defaults.withCredentials = true;

  $stateProvider

    .state('home', {
    url: "/home",
    templateUrl: "views/template.html",
    controller: 'HomeCtrl'
  })
    .state('TransCtrl', {
    url: "/transition",
    templateUrl: "views/template.html",
    controller: 'TransCtrl'
  })
  .state('about', {
    url: "/about",
    templateUrl: "views/template.html",
    controller: 'AboutCtrl'
  })

  .state('product', {
    url: "/product",
    templateUrl: "views/template.html",
    controller: 'ProductCtrl'
  })

  .state('productdetail', {
    url: "/productdetail/:id",
    templateUrl: "views/template.html",
    controller: 'ProductDetailCtrl'
  })

  .state('articledetail', {
    url: "/articledetail/:id",
    templateUrl: "views/template.html",
    controller: 'ArticleDetailCtrl'
  })

  .state('getallarticle', {
    url: "/getallarticle",
    templateUrl: "views/template.html",
    controller: 'GetAllArticleCtrl'
  })

  .state('tagname', {
    url: "/tagname",
    templateUrl: "views/template.html",
    controller: 'TagNameCtrl'
  })

  .state('searchtagname', {
    url: "/searchtagname/:tag",
    templateUrl: "views/template.html",
    controller: 'TagCtrl'
  })

  .state('samplemodal', {
      url: "/sample",
      templateUrl: "views/template.html",
      controller: 'SampleCtrl'
  })

  .state('sample1', {
      url: "/sample1",
      templateUrl: "views/template.html",
      controller: 'Sample1Ctrl'
  })

  $urlRouterProvider.otherwise("/home");

});


firstapp.filter('serverimage', function() {
  return function(input) {
    if (input) {
      return "http://localhost/mytest/uploads/" + input;
      // return  "http://wohlig.co.in/newfynx/uploads/" + input;
    } else {
      return "img/logo.png";
    }
  };
});


firstapp.directive('img', function($compile, $parse) {
  return {
    restrict: 'E',
    replace: false,
    link: function($scope, element, attrs) {
      var $element = $(element);
      if (!attrs.noloading) {
        $element.after("<img src='img/loading.gif' class='loading' />");
        var $loading = $element.next(".loading");
        $element.load(function() {
          $loading.remove();
          $(this).addClass("doneLoading");
        });
      } else {
        $($element).addClass("doneLoading");
      }
    }
  };
});
