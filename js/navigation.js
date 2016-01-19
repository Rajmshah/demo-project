var mainurl = "http://localhost/mytest/index.php/";
var adminurl = mainurl + "json/";

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
  var navigation = [{
    name: "Article",
    classis: "active",
    link: "#/getallarticle",
    subnav: [{
      name: "About",
      classis: "active",
      link: "#/about"
    }]
  }];

  return {
    getnav: function() {
      return navigation;
    },
    getArticleDetail: function(id, callback) {
      $http.get(adminurl + 'getsinglearticle?id=' + id).success(callback);
    },
    getALlArticle: function(pagedata, callback) {
      $http.get(adminurl + 'getallarticle?pageno=' + pagedata.pageno).success(callback);
    },
    getTagname: function(tag, callback) {
      $http.get(adminurl + 'getarticlebytagname?tag=' + tag).success(callback);
    },
    getTag: function(tag, callback) {
      $http.get(adminurl + 'getarticlebytagname?tag=' + tag).success(callback);
    },
    makeactive: function(menuname) {
      for (var i = 0; i < navigation.length; i++) {
        if (navigation[i].name == menuname) {
          navigation[i].classis = "active";
        } else {
          navigation[i].classis = "";
        }
      }
      return menuname;
    },

  }
});
