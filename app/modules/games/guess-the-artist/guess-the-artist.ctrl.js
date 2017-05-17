'use strict';

angular.module('myApp.guess-the-artist')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'modules/games/guess-the-artist/guess-the-artist.html',
            controller: 'GuessTheArtistCtrl',
            controllerAs: 'ctrl'
        });
    }])

    .controller('GuessTheArtistCtrl', ['GuessTheArtistLogic',
        function (GuessTheArtistLogic) {
            var ctrl = this;
            
            function _init(){
                ctrl.userGuess = '';
                GuessTheArtistLogic.initGame();
                ctrl.gameState = GuessTheArtistLogic.getGameState();
                ctrl.interactions = GuessTheArtistLogic.getGameInteractions();
            }

            ctrl.guessSubmitted = function(){
                ctrl.gameState = GuessTheArtistLogic.updateGameState(
                    {interactionType : ctrl.interactions.GUESS, value: ctrl.userGuess}
                );
            };
            
            _init();
           
        }]);
