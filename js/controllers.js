angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider', 'ngDialog','cfp.loadingBar'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout,cfpLoadingBar) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  cfpLoadingBar.start();

  $scope.mySlides = [
    'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
    'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
    'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
    'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
  ];
})
.controller('TransCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("transition");
  $scope.menutitle = NavigationService.makeactive("Transition");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})
.controller('ArticleDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $http, $stateParams) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("articledetail");
  $scope.menutitle = NavigationService.makeactive("Articledetail");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.tags = [];
  NavigationService.getArticleDetail($stateParams.id, function(data) {
    console.log(data);
    $scope.articledetails = data;
    $scope.tags = $scope.articledetails.tags.split(",");
  });

})

.controller('GetAllArticleCtrl', function($scope, $log, TemplateService, NavigationService, $timeout, $http) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("getallarticle");
  $scope.menutitle = NavigationService.makeactive("Getallarticle");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();


  $scope.pages = [];
  $scope.allArticles = [];
  $scope.pagedata = {};
  $scope.pagedata.pageno = 1;
  $scope.getMoreArticles = function(page) {
    $scope.pagedata.pageno = page;
    $scope.getAllArticles();
  };

  $scope.getAllArticles = function() {
    $scope.pages = [];
    NavigationService.getALlArticle($scope.pagedata, function(data) {
      console.log(data);
      // _.each(data.queryresult,function(n){
      //   $scope.allArticles.push(n);
      // })
      $scope.allArticles = data.queryresult;
      console.log($scope.allArticles);
      for (var i = 0; i < data.lastpage; i++) {
        if ((i + 1) == data.pageno) {
          $scope.pages.push({
            pageno: (i + 1),
            class: 'pg pgcol'
          });
        } else {
          $scope.pages.push({
            pageno: (i + 1),
            class: 'pg'
          });
        }
      }
      $scope.currentpg = data.pageno;
    });
  };

  $scope.getAllArticles();
  // $scope.articles=[
  //   {
  //   "title":"Article 1"
  // },
  //   {
  //   "title":"Article 1"
  // },
  //   {
  //   "title":"Article 1"
  // },
  //   {
  //   "title":"Article 1"
  // }
  // ];

})

.controller('TagNameCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("tagname");
  $scope.menutitle = NavigationService.makeactive("Tagname");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.todos = [];
  $scope.addTodo = function() {
    $scope.todos.push({
      text: $scope.todoText
    });
    $scope.todoText = '';
  };
  $scope.getSearch = function(data) {
    NavigationService.getTagname(data, function(data) {
      console.log(data);
      $scope.tagn = data.queryresult;
    });
  };
})


.controller('TagCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("searchtagname");
  $scope.menutitle = NavigationService.makeactive("Searchtagname");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.articletag = $stateParams.tag;
  NavigationService.getTag($scope.articletag, function(data) {
    console.log(data);
    $scope.tagging = data.queryresult;
  });

})

.controller('AboutCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log, ngDialog) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("about");
  $scope.menutitle = NavigationService.makeactive("About");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.allArticles=[];
  NavigationService.getImage(function(data) {
    console.log(data);
    // _.each(data.queryresult,function(n){
    //   $scope.allArticles.push(n);
    // })
    $scope.allArticles = data.queryresult;
  });

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.openD = function () {
					ngDialog.open({
						template: 'views/modal/sample1.html',
						controller: 'Sample1Ctrl',
						className: 'ngdialog-theme-default ngdialog-theme-custom'
					});
	};


  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/sample.html',
      controller: 'SampleCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };


  $scope.tabs = [{
    title: 'Dynamic Title 1',
    content: 'Dynamic content 1'
  }, {
    title: 'Dynamic Title 2',
    content: 'Dynamic content 2'
  }];
  $scope.ns = [{
    name: 'Raj',
    country: 'India'
  }, {
    name: 'Jay',
    country: 'Iraq'
  }, {
    name: 'Kai',
    country: 'Iran'
  }];

  $scope.form = {};
  $scope.form.name = "RajShah";
  $scope.lists = ["Raj", "Jay", "John", "Android"];
  $scope.myImages = [
    'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
    'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
    'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
    'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
  ];
  $scope.photos = "http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg";
  $scope.pics = "img/logo.png";
  $scope.text = "";
  $scope.remain = function() {
    return 100 - $scope.text.length;
  };
  $scope.clear = function() {
    $scope.text = "";
  };
  $scope.save = function() {
    alert("Note Saved");
  };

})
.controller('SampleCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, items, $uibModalInstance) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("about");
  $scope.menutitle = NavigationService.makeactive("About");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})

.controller('Sample1Ctrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("about");
  $scope.menutitle = NavigationService.makeactive("About");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('ProductCtrl', function($scope, TemplateService, NavigationService, $timeout, $http) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("product");
  $scope.menutitle = NavigationService.makeactive("Product");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  function isSuccess(data) {
    console.log(data.data.queryresult);
    var data1 = _.chunk(data.data.queryresult, 3);
    console.log(data1);
    $scope.products = data1;
  }

  $http.get('http://accessworld.in/admin/index.php/json/getproductbycategory?category=36&pageno=1&color=&type=&material=&finish=&compatibledevice=&compatiblewith=&brand=&pricemin=&pricemax=&microphone=&size=&lenght=&voltage=&capacity=&maxrow=18').success(isSuccess);
})

.controller('ProductDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $http, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("productdetail");
    $scope.menutitle = NavigationService.makeactive("Productdetail");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    var id = $stateParams.id;

    function isSuccess(data) {
      console.log(data);
      $scope.productdetails = data;
    }
    $http.get("http://accessworld.in/admin/index.php/json/getproductdetails?id=" + id).success(isSuccess);

  })
  .controller('headerctrl', function($scope, TemplateService) {
    $scope.images = 'img\logo.png';
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      $(window).scrollTop(0);
    });
  });
