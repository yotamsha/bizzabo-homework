/**
 * Created by yotam on 22/12/2016.
 */
angular.module('myApp.services')
    .service('ItunesApiService', ['$http','$sce', function ($http,$sce) {
        var API_PREFIX = 'https://itunes.apple.com/';
        //var API_PREFIX = https://itunes.apple.com/search?term=Jack Johnson&entity=album

        var Service = {
            getAlbumsByArtist: function (artist, limit) {
                var url = API_PREFIX + 'search?entity=album' +
                    '&term=' + artist;
                $sce.trustAsResourceUrl(url);
                return $http.jsonp(url,  {jsonpCallbackParam: 'callback'})
                    .then(function (result) {
                        return result.data;
                    });
                
            }
            
        };

        return Service;
    }]);
