angular.module('jdb', [])
    .service('Api', ['$http', '$q', '$httpParamSerializerJQLike', 'commonParams', function ($http, $q, $httpParamSerializerJQLike, commonParams) {
        var cachePool = {};
        var branchData = {};

        this.request = function (params) {
            var method = params.method = (params.method || 'POST').toUpperCase();
            if (angular.isObject(commonParams)) {
                if (angular.isObject(params.data)) {
                    angular.extend(params.data, commonParams);
                } else {
                    params.data = commonParams;
                }
            }

            if (angular.isObject(params.data)) {
                if (method === 'GET') {
                    params.params = params.data;
                    delete params.data;
                    params.paramSerializer = '$httpParamSerializerJQLike';
                } else if (method === 'POST') {
                    if (params.sign) {
                        params.data = setSighAndCommonPa(params.data, params.sign);
                    }
                    params.data = $httpParamSerializerJQLike(params.data);
                    angular.extend(params, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        }
                    });
                }
            }
            var deferred = $q.defer();
            params.timeout = deferred.promise;
            var request = $http(params);
            var promise = request.then(function (res) {
                return res.data;
            }).finally(function () {
                promise.abort = angular.noop;
                deferred = request = promise = null;
            });
            promise.abort = function () {
                deferred.resolve();
            };
            return promise;
        };

        this.getCache = function (key) {
            return cachePool[key] || cachePool || undefined;
        };

        this.setCache = function (key, value) {
            cachePool[key] = value;
        };

        this.setCacheObj = function (obj) {
            angular.extend(cachePool, obj);
            if (!cachePool.plan_company_name) {
                cachePool.plan_company_name = cachePool.company_name;
            }
        };

        this.setBranchData = function (obj) {
            angular.extend(branchData, obj);
        };

        this.getBranchData = function () {
            return branchData;
        }

        this.isEmptyObj = function (obj) {
            for (var name in obj) {
                return false;
            }
            return true;
        };

        function setSighAndCommonPa(params, sign) {
            params.ts = (new Date()).getTime();
            var tempObj = params;
            var keyName = [];
            var keyValue = [];
            for (var i in tempObj) {
                keyName.push(i);
            }
            keyName = keyName.sort();
            for (var j in keyName) {
                keyValue.push(tempObj[keyName[j]]);
            }
            keyValue.push(sign);
            //tempObj.sign = md5(keyValue.join('|'));
            return tempObj;
        }

    }]);