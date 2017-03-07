'use strict';
angular.module('IOU').factory('tools', function() {
    var factory = {};
    factory.multiply = function(a, b) {
        return a * b;
    };
    factory.setTitle = function(title) {
        try {
            window.SetTitle.setTitle(title);
        } catch (e) {
            alert(e);
        }

    };
    factory.dealwithMoneyToShow = function(money) {
        //将一般的钱转化为千分。显示
        // 1200  -----> 1,200
        //Api.toast(money);
        if (money === null || money == 0) {
            return '0元';
        }

        function hack(tempStr) {
            var tempArr = tempStr.split(',');
            if (tempArr[1].length < 1) {
                tempArr[1] = '000.' + tempArr[1];
            }
            if (tempArr[1] < 10) {
                tempArr[1] = '00' + tempArr[1];
            } else if (tempArr[1] < 100) {
                tempArr[1] = '0' + tempArr[1];
            }
            return tempArr.join(',');

        }

        function bigMoney(money) {
            return (money / 100000000).toFixed(2) + '亿元';
        }

        if (typeof money === 'string') {
            money = (money * 1).toFixed(2);
        }
        //console.log(money);
        if (typeof money === 'number') {
            money = (money * 1).toFixed(2);
        }
        if (money < 1) {
            return money + '元';
        }
        var tempMoneyStr = '';
        var xiaoshu = ((money + '').split('.')[1] === '00') ? '' : ('.' + (money + '').split('.')[1]);
        money = Math.floor(money / 1);
        if (money > 100000000000) {
            return bigMoney(money);
        }
        while (money > 0) {
            //console.log(money);
            if (money - 1000 >= 0) {
                //console.log((money % 1000));
                tempMoneyStr = ',' + (money % 1000) + tempMoneyStr;
                tempMoneyStr = hack(tempMoneyStr);
                money = Math.floor(money / 1000);
            } else {
                tempMoneyStr = (money % 1000) + tempMoneyStr;
                money = 0;
            }
            //console.log();
        }
        //console.log(tempMoneyStr + '元');
        return tempMoneyStr + xiaoshu + '元';
    };
    factory.timeToYYMMDD = function(seconds) {
        'string' == typeof seconds && (seconds = 1 * seconds);
        var tempDate = new Date(1e3 * seconds);
        var month = ((tempDate.getMonth() + 1) > 9) ? (tempDate.getMonth() + 1) : ('0' + (tempDate.getMonth() + 1));
        var date = ((tempDate.getDate()) > 9) ? (tempDate.getDate()) : ('0' + (tempDate.getDate()));
        return tempDate.getFullYear() + '/' + month + '/' + date;
    };

    factory.addBaifenbi = function(rate) {
        return rate ? rate + '%' : '%';
    };

    factory.pushEleToBaseInfoArr = function(obj) {

        var arr = obj.arr;
        console.log(arr);
        // var name = obj.name;
        var value = obj.value;
        // var tool = obj.tool;

        if (typeof(value) != 'undefined' && value != null && value != '') {
            arr.push({
                "name": obj.name,
                "value": obj.tool ? obj.tool(value) : value
            });
        }
    };

    factory.sendMeseage = function(str) {
        try {
            var img = new Image();
            img.src = 'http://www.jiedaibao.com/index.html?' + str + (new Date()).getTime();

        } catch (e) {
            alert(e);
            alert('发送图片出错');
        }
    };

    return factory;
});
