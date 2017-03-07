(function(global) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        console.log('Only support browser!');
        return;
    }

    var _document = global.document;

    function mockDeviceReady() {
        var e = new Event('deviceready');
        global.addEventListener('load', function () {
            // 为达到模拟效果，在此之前不会暴露接口
            exposeApis();
            _document.dispatchEvent(e);
        });
    }

    function exposeApis() {
        exposeCommonParams();
    }

    function exposeCommonParams() {
        global.CommonParams = {
            commonParams: function(callback) {
                callback({
                    "productID": "5815919718275566320001",
                    "JDBID": "BF712413-77B7-4767-8129-47FF58925877",
                    "tradeType": "3",
                    "deviceType": "iPhone 5S",
                    "proxyType": "http",
                    "memberID": "550357453066215428",
                    "channel": "appstore",
                    "h": "1136",
                    "appKey": "fb371c48e9a9b2a1174ed729ae888513",
                    "udid": "298b613a4b5c1a2e369d6a5b91299b9e80a21e80",
                    "w": "640",
                    "accessToken": "ACCESS_TOKEN5503574530662154281459335278960",
                    "deviceID": "B4541559-B800-4343-87E2-03E01DFCA1B7",
                    "platform": "iOS",
                    "clientVersion": "2.1.0",
                    "phoneVen": "1",
                    "jailbreak": 0,
                    "network": "5",
                    "systemVersion": "8.3",
                    //  "creditLimit": "123",
                    //"subPage":"credit-details",
                    "traceID": "9954E8A1-DEE2-4830-B5CC-01055031D183",
                    "companyName": '人人行',
                    "companyId": '123123',
                });
            }
        };
    }

    mockDeviceReady();

}(this));
