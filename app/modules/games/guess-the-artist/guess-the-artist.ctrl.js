'use strict';

angular.module('myApp.guess-the-artist')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'modules/games/guess-the-artist/guess-the-artist.html',
            controller: 'GuessTheArtistCtrl',
            controllerAs: 'ctrl'
        });
    }])

    .controller('GuessTheArtistCtrl', ['GuessTheArtistLogic','GameLogicService',
        function (GuessTheArtistLogic, GameLogicService) {
            var ctrl = this;

            function _init(){
                ctrl.userGuess = '';
                GameLogicService.initLogic(GuessTheArtistLogic);
                GameLogicService.initGame();
                ctrl.gameState = GameLogicService.getGameState();
                ctrl.gameConfig = GameLogicService.getGameConfig();
                ctrl.interactions = GameLogicService.getGameInteractions();
            }

            ctrl.guessSubmitted = function(){
                ctrl.gameState = GameLogicService.updateGameState(
                    {interactionType : ctrl.interactions.GUESS, value: ctrl.userGuess}
                );
                ctrl.userGuess = "";
            };
            
            ctrl.restart = function(){
                GameLogicService.initGame();
            };
            
            _init();
           
        }]);
