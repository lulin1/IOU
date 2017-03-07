'use strict';
document.addEventListener('deviceready', function() {
    //增加安卓刷新
    try {
        window.location.href = 'hybridscheme://dom.ready';
    } catch (e) {
        console.log(e);
    }

    CommonParams.commonParams(function(nativeData) {
        angular.module('jdb').constant('commonParams', nativeData);
        angular.bootstrap(document.body, ['IOU']);
    }, function() {
        alert('获取登录信息失败');
    });
});

angular.module('IOU', ['ionic', 'jdb'])
    .run(['$ionicPlatform', function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                window.StatusBar.styleDefault();
            }
        });
    }])
    .config(['$stateProvider', '$urlRouterProvider', 'commonParams', function($stateProvider, $urlRouterProvider, commonParams) {
        // commonParams.subpage = 'introduction';
        // commonParams.memberID="540600895054815845";
        // commonParams.productID="668044767878275261";
        // memberID=540600895054815845&productID=664944363274432670

        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: function() {
                    if (commonParams.subpage === 'introduction') {
                        return 'views/index.html';
                    }
                    if (commonParams.subpage === 'detailBorrow') {
                        return 'views/detailBorrow.html';
                    }
                    return 'views/detailLend.html';
                },
                controllerProvider: function() {
                    if (commonParams.subpage === 'introduction') {
                        return "";
                    }
                    if (commonParams.subpage === 'detailBorrow') {
                        return 'detailBorrow';
                    }
                    return 'detailLend';
                }
            });
            
        $urlRouterProvider.otherwise('/index');
    }]);

require('./services/api');
require('./services/enterpriseFundsApplyFactory');
require('./directive/linkUrl.directive');
require('./controllers/detailBorrow');
require('./controllers/detailLend');
require('./controllers/proListBorrow');
require('./controllers/proListLend');