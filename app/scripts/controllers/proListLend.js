'use strict';
angular.module('IOU')
    .controller('proListLend', ['$scope', 'Api', '$timeout', '$ionicPopup', '$location', '$state', 'commonParams', 'tools',
        function($scope, Api, $timeout, $ionicPopup, $location, $state, commonParams, tools) {
            $scope.data = {
                iouContractList: '',
                contract: '',
                tradeInfo: ''
            };


            var versionNum = commonParams && commonParams.clientVersion.replace(/\./g, '');
            var os = commonParams && commonParams.platform && commonParams.platform.toLowerCase();
            $scope.isApple = os == 'ios' ? true : false;
            $scope.$on('$ionicView.enter', function() {
                $scope.initPage();
                window.SetTitle && window.SetTitle.setTitle && window.SetTitle.setTitle('欠条详情');
            });

            $scope.initPage = function() {
                Api.request({
                    url: "{{IOUProListApi}}",
                    data: {}
                }).then(function(res) {
                    var data = res.data;
                    $scope.data.debtContractList = data.debtContractList;
                    
                    // alert($scope.data.iouContractList);

                    if (!data) {
                        toastError(res.error && res.error.returnUserMessage || '未知错误');
                        return false;
                    }

                    $scope.proListProtocol = function(url) {
                        if (url) {
                            alert(url);
                        }
                    }

                }).catch(function() {
                    toastError('2');
                });

            }

        }
    ]);