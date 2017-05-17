/**
 * Created by USER on 17/05/2017.
 */
angular.module('myApp.services')
    .service('UtilsService', [function () {

        var Service = {
            getRandomInt: function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            pickRandomValuesFromArray: function (array, size) {
                var tmp = array.slice(array);
                var ret = [];
                for (var i = 0; i < size; i++) {
                    var index = Math.floor(Math.random() * tmp.length);
                    var removed = tmp.splice(index, 1);
                    // Since we are only removing one element
                    ret.push(removed[0]);
                }
                return ret;
            }

        };

        return Service;
    }]);