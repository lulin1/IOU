'use strict';
angular.module('IOU')
    .controller('detailBorrow', ['$scope', 'Api', '$timeout', '$ionicPopup', '$location', '$state', '$ionicScrollDelegate',
        function($scope, Api, $timeout, $ionicPopup, $location, $state, $ionicScrollDelegate) {

            $scope.data = {
                title: '',
                contract: '',
                borrowInfo: '',
                infoDetail: ''
            };

            $scope.open = true;
            $scope.close = false;

            $scope.transClose = function() {
                $ionicScrollDelegate.resize(); //重新计算宽度和高度
                $scope.transInfo = false;
                $scope.open = true;
                $scope.close = false;
            };

            $scope.transOpen = function() {
                $ionicScrollDelegate.resize(); //重新计算宽度和高度
                $scope.transInfo = true;
                $scope.close = true;
                $scope.open = false;
            };

            $scope.$on('$ionicView.enter', function() {
                $scope.initPage();
                if (window.SetTitle && window.SetTitle.setTitle) {
                    window.SetTitle.setTitle('欠条详情');
                }
            });

            $scope.initPage = function() {
                Api.request({
                    url: "{{IOUBorrowApi}}",
                    data: {}
                }).then(function(res) {
                    var data = res.data;
    
                    if (res.error.returnCode != 0) {
                        window.toastError(data.error && data.error.returnUserMessage || '未知错误');
                        return;
                    }

                    // 如果有数据，那把数据挂在$scope.data下面
                    if (data.iouInfoList.length > 0) {
                        $scope.data.title = data.iouInfoList[0].title;
                        $scope.data.infoDetail = data.iouInfoList[0].infoDetail;
                        // alert(JSON.stringify($scope.data.infoDetail[0]))
                    }

                    if (data.borrowInfoList.length > 0) {
                        $scope.data.title = data.borrowInfoList[0].title;
                        $scope.data.borrowInfo = data.borrowInfoList[0].infoDetail;
                        //alert(JSON.stringify($scope.data.borrowInfo));
                    }
                });
            };

        }
    ]);