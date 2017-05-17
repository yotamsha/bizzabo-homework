/**
 * Created by USER on 17/05/2017.
 */
angular.module('myApp.services')
    .service('UtilsService', [function () {

        var Service = {
            getRandomInt: function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

        };

        return Service;
    }]);