'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
    
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    // $scope.dishes= menuFactory.getDishes();
    
    $scope.message = "Loading ...";
    $scope.showMenu = false;
    // $scope.dishes= {};
    // menuFactory.getDishes()
    // .then(
    //     function(response) {
    //         $scope.dishes = response.data;
    //         $scope.showMenu = true;
    //     },
    //     function(response) {
    //         $scope.message = "Error: "+response.status + " " + response.statusText;
    //     }
    // );

    // $scope.showMenu = true;
    // $scope.dishes = menuFactory.getDishes().query();

    menuFactory.getDishes().query(
        function(response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );
                
    $scope.select = function(setTab) {
        $scope.tab = setTab;
        
        if (setTab === 2) {
            $scope.filtText = "appetizer";
        }
        else if (setTab === 3) {
            $scope.filtText = "mains";
        }
        else if (setTab === 4) {
            $scope.filtText = "dessert";
        }
        else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };
}])

.controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
    
    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
    
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
                
}])

// .controller('FeedbackController', ['$scope', function($scope) {
.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
    // $scope.sendFeedback = function() {
        
    //     console.log($scope.feedback);
        
    //     if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
    //         $scope.invalidChannelSelection = true;
    //         console.log('incorrect');
    //     }
    //     else {
    //         $scope.invalidChannelSelection = false;
    //         $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
    //         $scope.feedback.mychannel="";
    //         $scope.feedbackForm.$setPristine();
    //         console.log($scope.feedback);
    //     }
    // };

    // getFeedback

    $scope.sendFeedback = function () {
        
        console.log($scope.feedback);
        feedbackFactory.getFeedback().save($scope.feedback);

        $scope.invalidChannelSelection = false;
        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
        $scope.feedback.mychannel="";
        $scope.feedbackForm.$setPristine();
    }
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
    // var dish= menuFactory.getDish(parseInt($stateParams.id,10));
    // $scope.dish = dish;
    $scope.message="Loading ...";
    // $scope.dish = {};
    $scope.showDish = false;
    // menuFactory.getDish(parseInt($stateParams.id,10))
    // .then(
    //     function(response){
    //         $scope.dish = response.data;
    //         $scope.showDish=true;
    //     },
    //     function(response) {
    //         $scope.message = "Error: "+response.status + " " + response.statusText;
    //     }
    // );

    // $scope.showDish = true;
    // $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});

    $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
        .$promise.then(
            function(response){
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );
}])

.controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
// .controller('DishCommentController', ['$scope', function($scope) {
    
    //Step 1: Create a JavaScript object to hold the comment from the form
    $scope.dishcomment = {rating:5, comment:"", author:"", date:"" };
    
    // $scope.submitComment = function () {  
    //   //Step 2: This is how you record the date
    //   $scope.dishcomment.date = new Date().toISOString();
      
    //   // Step 3: Push your comment into the dish's comment array
    //   $scope.dish.comments.push($scope.dishcomment);
      
    //   //Step 4: reset your form to pristine
    //   $scope.commentForm.$setPristine();
      
    //   //Step 5: reset your JavaScript object that holds your comment
    //   $scope.dishcomment = {rating:5, comment:"", author:"", date:"" };

    // };

    $scope.submitComment = function () {
        $scope.dishcomment.date = new Date().toISOString();
        console.log($scope.dishcomment);
        $scope.dish.comments.push($scope.dishcomment);

        menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
        $scope.commentForm.$setPristine();
        $scope.dishcomment = {rating:5, comment:"", author:"", date:""};
    }
}])

.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
    // $scope.dish = menuFactory.getDish(0);
    // $scope.promotion = menuFactory.getPromotion(0);
    // $scope.chef = corporateFactory.getLeader(3);

    $scope.message="Loading ...";

    // $scope.dish = {};
    $scope.showDish = false;
    // menuFactory.getDish(0)
    // .then(
    //     function(response){
    //         $scope.dish = response.data;
    //         $scope.showDish = true;
    //     },
    //     function(response) {
    //         $scope.message = "Error: "+response.status + " " + response.statusText;
    //     }
    // );
    
    // $scope.showDish = true;
    // $scope.dish = menuFactory.getDishes().get({id:0});

    $scope.dish = menuFactory.getDishes().get({id:0})
        .$promise.then(
            function(response){
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );

    $scope.showPromotion = false;
    $scope.promotion = menuFactory.getPromotions().get({id:0})
        .$promise.then(
            function(response){
                $scope.promotion = response;
                $scope.showPromotion = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );

    $scope.showChef = false;
    $scope.chef = corporateFactory.getLeaders().get({id:3})
        .$promise.then(
            function(response){
                $scope.chef = response;
                $scope.showChef = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );
}])

.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
    // $scope.leaders= corporateFactory.getLeaders();

    $scope.showLeader = false;
    corporateFactory.getLeaders().query(
        function(response){
            $scope.leaders = response;
            $scope.showLeader = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );
}])

;